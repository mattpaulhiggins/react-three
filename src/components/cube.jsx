import React, { Component } from "react";
import * as THREE from "three";

class Cube extends Component {
  constructor(props) {
    super(props);
    this.selector = React.createRef();
  }

  state = {
    updn: false,
    speed: 20
  };

  componentDidMount() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    this.mount.appendChild(this.renderer.domElement);
    this.geometry = new THREE.BoxGeometry(2, 2, 2);
    this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.cube);
    this.camera.position.z = 5;
    this.animate = () => {
      if (this.state.updn) {
        this.cube.rotation.x += this.state.speed / 1000;
      } else {
        this.cube.rotation.y += this.state.speed / 1000;
      }
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animate);
    };
    this.animate();
  }

  toggleState = e => {
    e.preventDefault();
    const newState = !this.state.updn;
    this.setState({ updn: newState });
  };

  handleSpeedChange = e => {
    e.preventDefault();
    const newSpeed = e.target.value;
    this.setState({ speed: newSpeed });
  };

  handleMouseMove = e => {
    e.persist();
    const bounds = this.selector.current.getBoundingClientRect();
    console.log(e.pageX - bounds.x, e.pageY - bounds.y);
  };

  render() {
    return (
      <div ref={this.selector} onMouseMove={this.handleMouseMove}>
        <div ref={ref => (this.mount = ref)} />
        <button onClick={this.toggleState}>Flip</button>
        <input
          type="range"
          defaultValue={this.state.speed}
          onInput={this.handleSpeedChange}
        ></input>
      </div>
    );
  }
}

export default Cube;
