# hierarchy

A Trello-like task manager, but with trees and graphs to help me plan my life better.  
This project is currently in active development.

## to-do

- Enforce some sort of customizable ordering to lists/trees
- List view refactor
  - What should the columns be? Should they really be statuses'?
- Allow users to mark trees to show up in the List View section
- Allow users to mark trees to show up in the Tree View section
- Allow users to mark what times they did what and show them stats about their
  day and how they spent their time in relation to their goals
- Add user seperation + creation + login
- Are you sure you want to delete the root node?
- Use different picker for selecting status on NodeOverlay
- Create single overlay (instead of a bunch of individual ones)
- Handle server errors properly
- General refactor
  - Ability to add rules to graphs (has one of type, has many of type)
    - Change state of card when added to tree

## bugs

- Status coloring is weird
- Deleting the root node generally just fails/doesn't fully delete children
- When a tree is given a status/label, all it's descendants get it
- Lots of text overflow issues with cards
