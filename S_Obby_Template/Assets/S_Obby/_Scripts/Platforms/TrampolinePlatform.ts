import { Collider } from 'UnityEngine';
import { ZepetoCharacter } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class TrampolinePlatform extends ZepetoScriptBehaviour {
    @SerializeField() private _jumpForce: number; // This variable saves the jump force

    // Unity calls this function on a trigger collider once per frame if it detects another Collider inside the trigger collider.
    OnTriggerStay(coll: Collider) {
        // Check if the colliding object has the tag player
        if (coll.CompareTag("Player")) {
            // Get the zepeto character from the collider
            let zepChar: ZepetoCharacter = coll.GetComponent<ZepetoCharacter>();
            // Set the jump power with the value of the jump force
            zepChar.additionalJumpPower = this._jumpForce;
            // Make the character jump
            zepChar.Jump();
        }
    }
    // Unity calls this function on a trigger collider when it ceases contact with another collider.
    OnTriggerExit(coll: Collider) {
        if (coll.CompareTag("Player")) {
            // Get the zepeto character from the collider
            let zepChar: ZepetoCharacter = coll.GetComponent<ZepetoCharacter>();
            // Set the jump power to 0
            zepChar.additionalJumpPower = 0;
        }
    }
}