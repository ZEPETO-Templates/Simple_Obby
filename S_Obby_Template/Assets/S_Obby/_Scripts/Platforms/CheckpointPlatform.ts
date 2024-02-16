import { Collider } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import PlayerController from '../PlayerController';

export default class CheckpointPlatform extends ZepetoScriptBehaviour {
    private _isActive: bool = false; // Saves a flag to know if the player has already activated this

    // Unity calls this function on a trigger collider once per frame if it detects another Collider inside the trigger collider.
    OnTriggerStay(coll: Collider) {
        // Check if the colliding object has the tag player and if the checkpoint is not activated yet
        if (coll.CompareTag("Player") && this._isActive == false) {
            this._isActive = true;

            // Get the player controller from the collider
            let playerController: PlayerController = coll.gameObject.GetComponent<PlayerController>();
            // Call to the function to set a new respawn
            playerController.SetRespawn(this.transform.position);
        }
    }
}