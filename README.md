# NUSPages
### An Orbital 2020 project by [internityz](https://github.com/internityz) and [cheeze2000](https://github.com/cheeze2000)

## What is NUSPages?
NUSPages is a website meant to blend the features of [**LinkedIn**](https://www.linkedin.com/) as well as [**Blogger**](https://www.blogger.com/about/) together, creating a platform by providing personal webpages for NUS students to store their portfolio and write whatever they want.

## Technology Stack
1. [MongoDB](https://www.mongodb.com/)
2. [Express](http://expressjs.com/)
3. [React](https://reactjs.org/)
4. [Node.js](https://nodejs.org/)

## Features
- [Personalised Cards](#personalised-cards)
  - Fill your website with personalised cards, be it your profile card or your blog posts.
- [Portfolio Generator](#portfolio-generator)
  - Keep track of your portfolio and print them (as PDF) on demand.
- [Theme Selector](#theme-selector)
  - Select between light or dark theme for your webpage.

## User Manual
### Authentication
The authentication system for NUSPages is not implemented due to the unavailability of the NUSNET authentication system. \
In the meantime, any credentials entered will be permitted into NUSPages. \
Furthermore, due to the said unavailability, the profile picture of every member will be an [AYAYA](https://www.frankerfacez.com/emoticon/162146-AYAYA) instead of their respective pictures from matriculation cards. The faculty information of every member is also defaulted to "School of Computing" because we cannot retrieve their faculty without NUSNET.

### Personalised Cards
#### Profile card
##### About Me
This feature can be accessed by hovering or clicking your profile avatar, then clicking the leftward arrow button. An introductiory paragraph can be written in the About Me section. Reclicking the arrow button on the profile card will minimise the About Me section.

#### Blog Posts
##### Creating Cards
This feature can be accessed by hovering or clicking your profile avatar. Upon submitting, the newly created card will be added to the bottom of the list. Cards are divided into 4 sections:
- Title
- Content
- Image
  - The image uploaded has an upload limit of 8MB.
- Footer

##### Deleting and Editing Cards
This feature can be accessed from the options in the said card.

##### Reordering Cards
The cards can be reordered by accessing the sort button next to the cards section. Cards can be dragged over another after clicking the sort button and another click on the sort button will confirm the reorder.

### Portfolio Generator
This feature can be accessed by hovering or clicking your profile avatar. Your portfolio will be written in Markdown, the markup language used for this file you are reading right now. The webpage to edit your portfolio has a few buttons to guide you through.
- **Save**: Saves your portfolio into the database.
- **Preview**: Redirects you to a page where you can also print your portfolio as PDF.
  - **Note:** The page generated will have no page margin. Due to some browsers, such as Safari, not supporting default page margin, we removed the default margin meant for the page. As such, you are required to configure the margin to your liking, which also means that this feature does not support mobile users.
- **Template**: Shows you a sample portfolio template meant as guidelines for writing your portfolio as well as showcasing a few features of Markdown
- **Help**: Redirects you to a Markdown Cheatsheet reference page.

### Theme Selector
This feature can be used by clicking on the Theme button found on the NavBar of the webpage. It switches between light mode and dark mode.
- **Light Mode**: Colour scheme comprises of light blue and white.
- **Dark Mode**: Colour scheme comprises of black, grey and white.

### User Feedback
We asked our ex-classmates and some international friends on Discord for their opinions on our Milestone 2 version of the website. We gladly made use of their feedback expressing their ideas to improve on our website for the Milestone 3. Here are some parts of the reviews obtained that we deem constructive:

After Milestone 2, we continued improving the design and the features of the website. In fact, we even redesigned it and Zong Yu decided to make the website light theme instead to make the design look more vibrant. However, a Discord friend mentioned about how he dislikes light theme and proposes to bring back dark theme, like in Milestone 2. Because of this, we added a theme selector so users are free to choose which theme they prefer. \
![rampe](https://cdn.discordapp.com/attachments/687552705144684558/736939345780670464/unknown.png)

Another Discord friend mentioned about the portfolio editing feature. It turns out to be a very important feature that we overlooked. Because of this, we added a preview feature for users to see what their portfolio looks like before downloading. \
![cmyk](https://cdn.discordapp.com/attachments/687552705144684558/736945086100668416/unknown.png)

One of our ex-classmates pointed out a very important feature regarding our cards at the beginning of Milestone 2. This led us to adding a feature to reorder the position of the cards so that they can choose which ones appear first. \
![william](https://cdn.discordapp.com/attachments/687552705144684558/736950689422508123/unknown.png)

Another one of our ex-classmates stated the eccentric feature of inserting image URLs instead of uploading images directly which we definitely agree. We researched on how to handle file uploads and decided to refactor our card writing approach. \
![prashant](https://cdn.discordapp.com/attachments/687552705144684558/736953822148296734/unknown.png)

### Software Engineering Practice
React projects highly rely on the concept of Object Oriented Programming and one of the most important part in React is its components. Having learned software engineering principles like SOLID, we have decided to follow the Single Responsibility Principle. \
\
Our webpage is divided into components, each component representing a unique responsibility. For instance in the user page, instead of creating a huge component representing the user page, we divided the page into multiple components. We can name a few mainly "Profile" and "Cards". We believe that the Profile component should solely deal with the identity of the users (e.g. avatar, faculty background, about me bio, etc.) which can hopefully be fetched from NUSNET ID authentication. On the other hand, Cards is created just to cater to the creating, deleting and editing cards, something that has nothing to do with the users identity. 
