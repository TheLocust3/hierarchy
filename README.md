# hierarchy

A Trello-like task manager, but with trees and graphs to help me plan my life better.  
This project is currently in active development.

## to-do

- Create Trello-like view backed with task graph
- Create single overlay (instead of a bunch of individual ones)
- Handle server errors properly
- Some weird bugs when adding/updating cards quickly
- Trees of some large height just stop rendering properly
- Create consistent ordering of nodes
- UI revamp
- Refactor EditableNode (it's becoming a monolith)
- General refactor
  - Send down flat list of nodes (array of ids of children)
    - Client puts it into a queryable graph format
  - Ability to add rules to graphs (has one of type, has many of type)
  - Define new types that can be added to cards (show up under labels and status)
