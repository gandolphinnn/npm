NPM packages

# dates
	format dates

# math
	math and logic functions

# graphics2
	2D graphics

# controls
	! REQUIRE graphics2 !
	The 'user commands' section is used to easily access input data like mouse state and position and key states independently.
	Plus, by copying it values in 'inspectVar', it's possible to easily inspect a variable in the console every time a mouse button is pressed

# rigid2
	! REQUIRE math AND graphics2 !
	'RigidRect' and 'RigictCirc' are used to define an object (a rectangle/square and a circle) with coordinates, direction in degrees and dimension.
	It provides functions to determine if it hits or not another RigidObject and the new direction if it bounce on a wall.
	It's not intended to be used for graphic purposes but just for game logic.