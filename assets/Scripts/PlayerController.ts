import { _decorator, Component, Node, input, Input, EventTouch, EventMouse, Vec3} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    private _startJump: boolean = false;
    private _jumpStep: number = 0;
    private _curJumpTime: number = 0;
    private _jumpTime: number = 0.1;
    private _curJumpSpeed: number = 0;
    private _curPos: Vec3 = new Vec3();
    private _deltaPos: Vec3 = new Vec3(0, 0, 0);
    private _targetPos: Vec3 = new Vec3();
    
    jumpByStep(step: number) {
        if (this._startJump) {
            return;
        }
        this._startJump = true;  // 标记开始跳跃
        this._jumpStep = step; // 跳跃的步数 1 或者 2
        this._curJumpTime = 0; // 重置开始跳跃的时间
        this._curJumpSpeed = this._jumpStep / this._jumpTime; // 根据时间计算出速度
        this.node.getPosition(this._curPos); // 获取角色当前的位置
        Vec3.add(this._targetPos, this._curPos, new Vec3(this._jumpStep, 0, 0));    // 计算出目标位置
    }

    start() {
        input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);
    }

    onMouseUp(event: EventMouse) {
        if (event.getButton() === 0) { //左鍵
            this.jumpByStep(1);
        } else if (event.getButton() === 2) { //右鍵
            this.jumpByStep(2);
        }
    }

    update(deltaTime: number) {
        
    }
    
}


