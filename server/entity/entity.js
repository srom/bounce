
export default class Entity {

    addTo (stage) {
        stage.addChild(this.el);
        return this;
    }

    isAt (pos) {
        return this.el.position.x === pos.x && this.el.position.y === pos.y;
    }
}
