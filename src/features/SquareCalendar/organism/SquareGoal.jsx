import { useEffect, useRef } from 'react';
import { Engine, Render, Runner, Bodies, Composite } from 'matter-js';

const SQUARE_SIZE = 25;

const PhysicsSimulation = ({ initBoxCount = 0, onBoxAdded = () => { } }) => {
    const scene = useRef(null);
    const engine = useRef(null);
    const render = useRef(null);
    const runner = useRef(null);

    // Initialize the physics engine
    useEffect(() => {
        if (!scene.current) return;

        // Create engine and world
        engine.current = Engine.create();

        // Get container dimensions
        const containerWidth = scene.current.clientWidth;
        const containerHeight = scene.current.clientHeight;

        // Create renderer
        render.current = Render.create({
            element: scene.current,
            engine: engine.current,
            options: {
                width: containerWidth,
                height: containerHeight,
                wireframes: false,
                background: '#f0f0f0'
            }
        });

        // Create ground
        const ground = Bodies.rectangle(
            containerWidth / 2,
            containerHeight,
            containerWidth,
            50,
            {
                isStatic: true,
                render: { fillStyle: '#2e2e2e' }
            }
        );

        // Create walls to prevent objects from escaping
        const leftWall = Bodies.rectangle(-20, containerHeight / 2, 50, containerHeight, {
            isStatic: true,
            render: { fillStyle: '#2e2e2e' }
        });

        const rightWall = Bodies.rectangle(containerWidth + 20, containerHeight / 2, 50, containerHeight, {
            isStatic: true,
            render: { fillStyle: '#2e2e2e' }
        });

        // Add all bodies to the world
        Composite.add(engine.current.world, [ground, leftWall, rightWall]);

        // Run the engine and renderer
        Render.run(render.current);
        runner.current = Runner.create();
        Runner.run(runner.current, engine.current);

        // Handle window resize
        const handleResize = () => {
            if (!render.current || !scene.current) return;

            const newWidth = scene.current.clientWidth;
            const newHeight = scene.current.clientHeight;

            // Update renderer dimensions
            render.current.options.width = newWidth;
            render.current.options.height = newHeight;
            render.current.canvas.width = newWidth;
            render.current.canvas.height = newHeight;

            // Update ground position
            Composite.clear(engine.current.world, false);

            const ground = Bodies.rectangle(
                newWidth / 2,
                newHeight,
                newWidth,
                50,
                { isStatic: true, render: { fillStyle: '#2e2e2e' } }
            );

            const leftWall = Bodies.rectangle(0, newHeight / 2, 50, newHeight, {
                isStatic: true,
                render: { fillStyle: '#2e2e2e' }
            });

            const rightWall = Bodies.rectangle(newWidth, newHeight / 2, 50, newHeight, {
                isStatic: true,
                render: { fillStyle: '#2e2e2e' }
            });

            Composite.add(engine.current.world, [ground, leftWall, rightWall]);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);

            if (runner.current) {
                Runner.stop(runner.current);
                runner.current = null;
            }

            if (render.current) {
                Render.stop(render.current);
                render.current.canvas.remove();
                render.current = null;
            }

            if (engine.current) {
                Engine.clear(engine.current);
                engine.current = null;
            }
        };
    }, []);

    // Handle click to add a box
    const handleClick = (e) => {
        if (!engine.current) return;

        // Get click position relative to the canvas
        const rect = scene.current.getBoundingClientRect();
        const x = e.clientX - rect.left;

        // Create a box with random color
        const box = Bodies.rectangle(
            x,
            -50, // Drop from top
            SQUARE_SIZE,
            SQUARE_SIZE,
            {
                restitution: 0.6, // Bounciness
                friction: 0.1,
                density: 1, // Very low density makes it light
                mass: 0, // Explicitly set low mass
                render: {
                    fillStyle: '#FFA500', // Orange-yellow like the sun
                    strokeStyle: '#000000', // Black stroke
                    lineWidth: 2 // Stroke width
                }
            }
        );

        Composite.add(engine.current.world, [box]);
        onBoxAdded(box);
    };

    useEffect(() => {
        const addBoxesWithDelay = async () => {
            for (let i = 0; i < initBoxCount; i++) {
                // Get container dimensions and use them to ensure boxes are within the screen
                if (scene.current) {
                    const rect = scene.current.getBoundingClientRect();
                    const randomX = Math.random() * rect.width;
                    handleClick({ clientX: randomX + rect.left, clientY: 0 });

                    // Wait 1 second before adding the next box
                    await new Promise(resolve => setTimeout(resolve, 50));
                }
            }
        };

        addBoxesWithDelay();
    }, []);

    return (
        <>
            <div
                ref={scene}
                onClick={handleClick}
                className="w-screen h-[calc(100vh-96px)]"
            />
        </>
    );
};

export default PhysicsSimulation;
