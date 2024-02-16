import { Collider, Vector3 } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import PlayerController from '../PlayerController';

export default class ConveyorPlatform extends ZepetoScriptBehaviour {
    private _force: number = 2;

    // Unity calls this function on a trigger collider once per frame if it detects another Collider inside the trigger collider.
    OnTriggerStay(coll: Collider) {
        // Check if the colliding object has the tag player
        if (coll.CompareTag("Player")) {
            // Get the player controller from the collider
            let playerController: PlayerController = coll.gameObject.GetComponent<PlayerController>();
            // Push the player forwards of the conveyor
            playerController._zepetoCharacter.characterController.SimpleMove(this.transform.forward);
            // Set the additional walk and run speed to the force of the conveyor
            playerController._zepetoCharacter.additionalWalkSpeed = -this._force;
            playerController._zepetoCharacter.additionalRunSpeed = -this._force;
        }
    }

    // Unity calls this function on a trigger collider when it ceases contact with another collider.
    OnTriggerExit(coll: Collider) {
        // Check if the colliding object has the tag player
        if (coll.CompareTag("Player")) {
            // Get the player controller from the collider
            let playerController: PlayerController = coll.gameObject.GetComponent<PlayerController>();
            // Set the additional walk and run speed to 0
            playerController._zepetoCharacter.additionalWalkSpeed = 0;
            playerController._zepetoCharacter.additionalRunSpeed = 0;
        }
    }
}