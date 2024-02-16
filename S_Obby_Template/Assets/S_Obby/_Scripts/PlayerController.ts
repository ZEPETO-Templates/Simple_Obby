import { Quaternion, Vector3 } from 'UnityEngine';
import { CharacterState, ZepetoCharacter, } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class PlayerController extends ZepetoScriptBehaviour {
    public _zepetoCharacter: ZepetoCharacter; // Reference to the zepeto character
    private _spawnPos: Vector3; // Reference to the actual spawn position

    // Start is called on the frame when a script is enabled just before any of the Update methods are called the first time.
    Start() {
        // Get the reference of the zepeto character
        this._zepetoCharacter = this.gameObject.GetComponent<ZepetoCharacter>();
        // Set the game object tag of the player
        this.gameObject.tag = "Player";
        // Set the first spawn position
        this._spawnPos = this.transform.position;

        // When the character updates his state
        this._zepetoCharacter.OnUpdateState.AddListener((state) => {
            // If he is landing or stamping
            if (state == CharacterState.Landing || state == CharacterState.Stamp) {
                // Set the additional jump power on 0
                this._zepetoCharacter.additionalJumpPower = 0;
            }
        });
    }
    // Update is called every frame, if the MonoBehaviour is enabled
    Update() {
        if (this.transform.position.y < -3) {
            this.Respawn();
        }
    }

    // This function makes the player respawn
    Respawn() {
        // If the player is not in the teleport state
        if (this._zepetoCharacter.CurrentState != CharacterState.Teleport) {
            // Teleport the player to the spawn pos
            this._zepetoCharacter.Teleport(this._spawnPos, Quaternion.identity);
        }
    }

    // This function set a new spawn position
    SetRespawn(position: Vector3) {
        this._spawnPos = position;
    }
}