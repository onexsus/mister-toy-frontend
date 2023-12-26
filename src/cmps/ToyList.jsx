import {PreviewToy} from './PreviewToy.jsx'



export function ToyList({toys,onRemoveToy,onEditToy}){
  return(
    <ul className="clean-list">
             {
              toys.map(toy=>{
                
                return  <PreviewToy
                   key={toy._id} 
                   toy={toy}
                   onRemoveToy={onRemoveToy}
                   onEditToy={onEditToy}
                   />
              })
             }
    </ul>
  )
}