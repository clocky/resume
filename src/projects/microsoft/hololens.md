---

permalink: "hardware/hololens/index.html"
dynamicPermalink: false
eleventyNavigation:
  key: Skype for HoloLens
  parent: Projects

layout: project.njk
title: Skype for HoloLens
client: Microsoft
date: 2016-02-26
headline: Windows Holographic + Windows 10
tags: 
  - hardware
collaborators:
  - Austin Lee
  - Joe Thompson
  - Maciek Janicki
  - Mark Swift
  - Paul Sim
  - Sergei Tuterov 
abstract: |
  Design manager for the initial release of Skype on HoloLens experience,
  deployed by NASA to the International Space Station as part of "Project
  Sidekick".
---

## Windows Holographic + Windows 10

My team were responsible for building the companion experience for remote
participants and collaborating with the Windows Holographic team for the native
app.
{.lead}

After the general dissolution of Skype into the Microsoft Teams family, this
product lives on "Remote Assistance for Dynamics 365".

{% img "/img/projects/microsoft/hololens-video-1_1600_c.jpg" %}
{% img "/img/projects/microsoft/hololens-video-2_1600_c.jpg" %}

While the holographic version of the application served as a showcase for
permitting the user to share their Mixed Reality experience with a third party,
many of the design challenges were around how Windows users joining the HoloLens
user could interact with a 3D space on a 2D input plane.

{% img "/img/projects/microsoft/hololens-video-3_1600_c.jpg" %}
{% img "/img/projects/microsoft/hololens-video-6_1600_c.jpg" %}

### Holographic buttons

Within the Holographic UI, care was taken how to consider the use of the Skype
brand and 'flat' design within a 3D space.

For example, I created an early prototype in Framer to get a sense of rendering
gaze and hover states for call controls on a physical surface while using the
Skype in-house icon style.

<div class="embed-responsive embed-responsive-16by9 mb-5">
    <iframe src="/framer/hololens/index.html" class="embed-responsive-item">
    </iframe>
</div>

### Motion and hierarchy

Working with the motion design team at Skype, care was taken to produce clear
menu structures that would work in both 2D and 3D space, optimised for short
distance movements with the users gaze or pointing device:

https://vimeo.com/288078818
