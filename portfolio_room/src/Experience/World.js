import * as THREE from 'three'
import Experience from './Experience.js'

export default class World
{
    constructor(_options)
    {
        this.experience = new Experience()
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        this.resources.on('groupEnd', (_group) =>
        {
            if(_group.name === 'base')
            {
                this.setRoom()
            }
        })
    }
    setRoom(){
        this.room={}
        this.room.model=this.resources.items.roomModel.scene
        //this.room.texture = this.resources.items.backedTexture
        //this.room.texture.encoding = THREE.sRGBEncoding
        //this.room.material = new THREE.MeshBasicMaterial({map: this.room.texture})
        /*
         this.room.model.traverse((_child)=>{
             if(_child instanceof THREE.Mesh){
                 _child.material = this.room.material
             }
         })


        */
       this.scene.add(this.room.model)
           console.log(this.room.model)
    
       const directionLight=new THREE.DirectionalLight('#ffffff',3)
    
    directionLight.position.set(5,5,5)
    this.scene.add(directionLight)
    }



    resize()
    {
    }

    update()
    {
    }

    destroy()
    {
    }
}