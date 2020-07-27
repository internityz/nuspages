import React, { Component } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Card from "./Card";

function transform(card, isOwner) {
  return (
    <Card
      content={card.content}
      footer={card.footer}
      image={card.image}
      id={card._id}
      owner={isOwner}
      title={card.title}
    />
  );
}
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

export default class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      isEdit: false,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.reorder = this.reorder.bind(this);
    this.save = this.save.bind(this);
    this.getItemStyle = this.getItemStyle.bind(this);
  }
  getItemStyle = (isDragging, draggableStyle) =>
    this.props.getTheme()
      ? {
          // some basic styles to make the items look a bit nicer
          userSelect: "none",
          padding: grid * 2,
          margin: `0 0 ${grid}px 0`,

          // change background colour if dragging
          background: isDragging ? "hsl(204, 86%, 53%)" : "white",

          // styles we need to apply on draggables
          ...draggableStyle,
        }
      : {
          // some basic styles to make the items look a bit nicer
          userSelect: "none",
          padding: grid * 2,
          margin: `0 0 ${grid}px 0`,

          // change background colour if dragging
          background: isDragging ? "#808080" : "(0, 0%, 14%)",

          // styles we need to apply on draggables
          ...draggableStyle,
        };

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const cards = reorder(
      this.state.cards,
      result.source.index,
      result.destination.index
    );

    this.setState({
      cards,
    });
  }

  reorder() {
    this.setState({ ...this.state, isEdit: true });
  }

  save() {
    this.setState({ ...this.state, isEdit: false });
    const xs = this.state.cards;
    const ys = xs.map((x, i) => ({ ...x, priority: i }));

    axios.patch(`http://${window.location.hostname}:5000/cards/`, ys, {
      withCredentials: true,
    });
  }

  render() {
    const c = this.state.isEdit ? "fas fa-check-circle" : "fas fa-sort";
    return (
      <div className="columns is-mobile">
        {this.state.isEdit ? (
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="column"
                >
                  {this.state.cards.map((card, index) => (
                    <Draggable
                      key={card._id}
                      draggableId={card._id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={this.getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          {transform(card, this.state.isOwner)}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <div className="column" id="cards">
            {this.state.cards.map((x) => transform(x, this.state.isOwner))}
          </div>
        )}
        <div className="column is-narrow">
          <button
            className="button"
            key="unique"
            onClick={this.state.isEdit ? this.save : this.reorder}
          >
            <span>
              <i className={c} />
            </span>
          </button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    axios
      .get(
        `http://${window.location.hostname}:5000/cards/filter/${this.props.username}`
      )
      .then((res) => {
        const { props } = this;
        this.setState({
          cards: res.data.sort((a, b) => a.priority - b.priority),
          isOwner: props.session === props.username,
        });
        const xs = this.state.cards;
        const ys = xs.map((x, i) => ({ ...x, priority: i }));

        axios.patch(`http://${window.location.hostname}:5000/cards/`, ys, {
          withCredentials: true,
        });
      });
  }
}
