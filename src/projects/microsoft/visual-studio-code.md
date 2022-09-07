---
permalink: "desktop/vscode/index.html"
dynamicPermalink: false
eleventyNavigation:
  key: Visual Studio Code
  parent: Projects

layout: project.njk
title: Visual Studio Code
client: Microsoft
date: 2021-10-11
abstract: Design director for the Visual Studio family, delivering an open-source library of components, documentation and Figma libraries to the community.
headline: 
collaborators:
 - David Dossett
 - Hawk Ticehurst
 - Kaitlin Brooks
 - Marisa Parker
 - Miguel Solorio
tags: 
 - desktop
---

## An extension ecosystem, driven by design

An enormous part of the appeal of Visual Studio Code (VSCode) is the vast 
ecosystem of extensions that allow end users to create a truly custom experience
that's optimised for their personal needs and preferred development tools.
{.lead}

Howeve as these extensions grew in complexity and found themselves moving from
simple functionality into complex full web views in the main panel. While these
were often showcases of the power of the VSCode extension model, their
custom-drawn interfaces often felt out of place with the rest of the VSCode UI.

### "It's like the wild west" {.mt-3}

After some initial research and exploration of the most popular VSCode
extensions, myself and the team discovered that many extensions - including
those created by Microsoft - were deployed as entirely custom UI's that couldn't
access the common VSCode controls and themes, which in turn led to accessibility
issues, inconsistency and an overall poor quality customer experience.

### Open source design {.mt-5}

After an initial pass through core elements and validating against our own usage
for complex extensions published by Microsoft, we posted our own working files
to the [Figma Community](https://www.figma.com/community/file/1071566662997054792/Webview-UI-Toolkit-for-Visual-Studio-Code)
for end users and other designers to use the same core elements as our own:

{% img "/img/projects/microsoft/figma-community.png", false %}

### Developing in the open

With the goal of reducing friction for 3rd-party developers to adopt our toolkit,
we built a set of core controls using [Web Components](https://www.webcomponents.org)
that could be adopted into existing frameworks.

Building upon the existing base of Microsoft's open-source
[FAST](https://www.fast.design) projects, we deployed an interactive [set of
controls and components](https://microsoft.github.io/vscode-webview-ui-toolkit/)
using Storybook, to help developers examine, understand and consume individual
elements:

{% img "/img/projects/microsoft/vscode-storybook.png", false %}

### Measuring success

After our initial announcement and [blog
post](https://code.visualstudio.com/blogs/2021/10/11/webview-ui-toolkit) in
October 2021, the community response was enormously positive - backed up by
usage over time that showed both incremental growth in GitHub Stars, but also a
steady weekly download rate of over 13,000 on
[npm](https://www.npmjs.com/package/@vscode/webview-ui-toolkit).

<iframe style="width:100%;height:auto;min-width:600px;min-height:400px;" src="https://star-history.com/embed?secret=Z2hwX3ZXQnBlYWdHQzM3Szh3QkdnaEJVNEphZnVqbU55dzFYMWVvQw==#microsoft/vscode-webview-ui-toolkit&Date" frameBorder="0"></iframe>
