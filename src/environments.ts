import {
    Scene,
    Engine,
    AssetsManager,
    Vector3,
    TransformNode,
    SceneLoader,
    Mesh
} from "babylonjs";

import { Player } from "./models/Player";
import * as GUI from "babylonjs-gui";
import 'babylonjs-loaders';
import { AbstractMesh } from "babylonjs/Meshes/abstractMesh";

export class Environment {
    private _scene: Scene;
    private _engine: Engine;
    private _players: Array<Player>;

    constructor(scene: Scene, engine: Engine) {
        this._scene = scene;
        this._engine = engine;

        //Import data from JSON
        this._players = require('./data/players.json');
    }

    public createCharacterButtons() {
        // Create the main 3D UI manager for the icon grid
        var mainManager = new GUI.GUI3DManager(this._scene);
    
        // Create a cylindrical panel so that the images wrap around the user
        var mainButtonPanel = new GUI.CylinderPanel();
        mainButtonPanel.margin = 0.2;
        mainManager.addControl(mainButtonPanel);
    
        // Create an anchor so that the main panel doesn't move
        var anchor = new TransformNode("");
        mainButtonPanel.linkToTransformNode(anchor);
        mainButtonPanel.position =  new Vector3(0,-2,-3);
    
        // Create 8 columns and 2 rows so that each of the 16 players can be displayed
        mainButtonPanel.columns = 8;
        mainButtonPanel.rows = 2;
    
        // Set panel layouts
        mainButtonPanel.blockLayout = true;

        // Create the mesh 3D UI manager for the pop-up image when a user selects a player
        var meshManager = new GUI.GUI3DManager(this._scene);
        var meshPanel = new GUI.PlanePanel();
        meshPanel.margin = 0.2;
            
        // Add meshPanel to meshManager and anchor it
        meshManager.addControl(meshPanel);
        meshPanel.linkToTransformNode(anchor);
        meshPanel.position = new Vector3(6, 0, -1);
            
        // Set the player container and add it to the mesh panel
        var displayStatsContainer = new GUI.HolographicButton("orientation");
        meshPanel.addControl(displayStatsContainer);
        displayStatsContainer.isVisible = false;

    }
}

