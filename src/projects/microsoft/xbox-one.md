---
permalink: "hardware/xbox-one/index.html"
dynamicPermalink: false

eleventyNavigation:
  key: Skype for Xbox One
  parent: Projects

layout: project.njk
title: Skype for Xbox One
client: Microsoft
date: 2017-04-13
tags: hardware
headline: 
abstract: Visual, motion and interaction design for the refreshed Skype on Xbox One universal application (UWP).
thumbnail: thumbnail-xbox.png
hero:
 - true
text:
  - 
  - 
collaborators:
 - Lauren Kuan
 - Ryan Menezes
 - Jigar Dani
---

## Optimising for the living room

I was responsible for all aspects of the design of the UWP (Universal Windows
Platform) conversion of the Skype for Windows desktop app, primarily defining
interactions that respected the alternative input modes using the Kinect,
gamepad and media remotes.
{.lead}

With the opportunity to make better use of the screen size that were common with
with Xbox setups in the home, I designed a refreshed visual design that adapted
content more appropriately for a 10ft interface, while respecting common
consumer TV screen settings.

{% img "/img/projects/microsoft/xbox-gvc.png" %}

{% img "/img/projects/microsoft/xbox-recents.png" %}

One curiosity that came up during our user research was the use of the left-hand
"View" button, that many users - even experienced gamers - genuinely didn't know
the name of, which brought us to having to visually show the button on the
initial setup screens.

{% img "/img/projects/microsoft/xbox-start.png" %}

### Pivoting on hardware

A key challenge during the development cycle was the [deprecation of the Kinect accessory](https://kotaku.com/microsoft-announces-xbox-one-without-kinect-shipping-j-1575644372"), removing
the ability to use skeletal tracking to correct crop the video to focus on the
speaker; the flip-side was that it enabled Xbox owners to use any regular
consumer-grade webcam for the app.

I proposed an alternate scheme where the analog triggers and sticks on the Xbox
controller could be used to permit fine-grained control of the local video
cropping, taking cues from how Xbox owners frequently interact with in-game
objects such as weapons.

Built in Framer, it helped sell the idea to stakeholders in both product
management and engineering, especially helping with estimation of development
effort.

https://vimeo.com/293655866
