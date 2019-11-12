Canvas.backgroundColor = "#666"

container = new Layer 
	width: 768
	height: 200
	backgroundColor: "#666"
	rotationX: 60, rotationZ: 45

container.center()

# Array of Unicode references for the MDL Asset glyphs
glyphs = ["&#xe714;", "&#xe720;", "&#xe710;", "&#xe778;"]
colors = ["#00aff0", "#00aff0", "#00aff0", "#e81123"]

# Reusable font properties for both surface and icon

font = { 
	fontFamily: 'FullMDL2Assets', fontSize: '64px'
	textAlign: 'center', 	lineHeight: '124px'
}

# Reusable dimensions for button and icon

dimensions = {
	width: 128, height: 128, borderRadius: 64
	rotationX: 60, rotationZ: 45
}

surfaces = for i in [0..3]
	# Define the button layer
	surface = new Layer
		parent: container
		x: 64 + (i * 160)
		y: 40
		z: 10
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
		x: 0
		y: 0
		width: 128, height: 128, borderRadius: 64
		backgroundColor: "transparent", color: "#fff"
		html: glyphs[i]
		style: font
	
	# Custom property that refers to the related icon.
	surface.upperLayer = icon
	
	icon.states.add 
		raised: z: 50
		lowered:  z: 0
	surface.states.add 
		raised: z: 20, shadowX: 20, shadowY: 20
		lowered:  z: 10, shadowX: 10, shadowY: 10
	surface.on Events.MouseOver, ->
		@states.switch('raised')
		@upperLayer.states.switch('raised')
	surface.on Events.MouseOut, ->
		@states.switch('lowered')
		@upperLayer.states.switch('lowered')

tilt = new SliderComponent
	value: 60
	y: 40
	min: 15
	max: 60

tilt.centerX()
tilt.on "change:value", ->
    container.rotationX = this.value