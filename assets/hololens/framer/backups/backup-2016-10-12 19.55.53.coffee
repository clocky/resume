# Project Info
# This info is presented in a widget when you share.
# http://framerjs.com/docs/#info.info

Framer.Info =
	title: "Skype HoloLens gaze test"
	author: "Mark McLaughlin"
	twitter: "@clocky"
	description: ""

Canvas.backgroundColor = "#666"

container = new Layer 
	width: 608
	height: 128
	backgroundColor: "transparent"
	rotationX: 45, rotationZ: 35.264
	perspective: 0

container.center()

# Array of Unicode references for the MDL Asset glyphs
#glyphs = ["&#xe714;", "&#xe720;", "&#xe710;", "&#xe778;"]
glyphs = ["&#xe102;", "&#xe106;", "&#xe415;", "&#xe101;"]
colors = ["#00aff0", "#00aff0", "#00aff0", "#e81123"]

# Reusable font properties for both surface and icon

font = { 
#	fontFamily: 'FullMDL2Assets', fontSize: '64px'
	fontFamily: 'Skype Assets', fontSize: '64px'
	fontWeight: 100
	textAlign: 'center', 	lineHeight: '124px'
}

surfaces = for i in [0..3]
	# Define the button layer
	surface = new Layer
		parent: container
		x: (i * 160)
		z: 0
		width: 128, height: 128, borderRadius: 64
		backgroundColor: colors[i]
		shadowX: 10, shadowY: 10
		shadowBlur: 20, shadowColor: "rgba(0,0,0,0.8)"
		# This is an RGBA value that looks like #077DB4 when on #00AFF0
		color: 'RGBA(0,0,0,0.28)'
		html: glyphs[i]
		style: font
	
	# Define the icon that sits on top 
	icon = new Layer
		parent: surface
		width: 128, height: 128, borderRadius: 64
		backgroundColor: "transparent", color: "#fff"
		html: glyphs[i]
		style: font
	
	# Custom property that refers to the related icon.
	surface.upperLayer = icon
	
	icon.states.add 
		raised: z: 64
		lowered:  z: 0
	surface.states.add 
		raised: z: 16, shadowX: 20, shadowY: 20
		lowered:  z: 0, shadowX: 10, shadowY: 10
	surface.on Events.MouseOver, ->
		@states.switch('raised')
		@upperLayer.states.switch('raised')
	surface.on Events.MouseOut, ->
		@states.switch('lowered')
		@upperLayer.states.switch('lowered')

