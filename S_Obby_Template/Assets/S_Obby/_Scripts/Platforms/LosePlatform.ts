import { Collider } from 'UnityEngine';
import { ZepetoCharacter } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import PlayerController from '../PlayerController';

export default class LosePlatform extends ZepetoScriptBehaviour {
    // Unity calls this function on a trigger collider once per frame if it detects another Collider inside the trigger collider.
    OnTriggerStay(coll: Collider) {
        // Check if the colliding object has the tag player
        if (coll.CompareTag("Player")) {
            // Get the player controller from the collider
            let playerController: PlayerController = coll.gameObject.GetComponent<PlayerController>();
            // Call to the function to respawn
            playerController.Respawn();
        }
    }
}