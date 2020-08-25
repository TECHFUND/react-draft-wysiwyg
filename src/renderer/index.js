import Embedded from './Embedded';
import getImageComponent from '../renderer/Image';

const getBlockRenderFunc = (config, customBlockRenderer) => (block) => {
  if (typeof customBlockRenderer === 'function') {
    const renderedComponent = customBlockRenderer(block, config, config.getEditorState);
    if (renderedComponent) return renderedComponent;
  }
  if (block.getType() === 'atomic') {
    const contentState = config.getEditorState().getCurrentContent();
    if(contentState && contentState!==null){
      const entity = contentState.getEntity(block.getEntityAt(0));
      if (entity && entity.type === 'IMAGE') {
        let imageComponent = null
        try {
          imageComponent = getImageComponent(config)
          return {
            component: imageComponent,
            editable: false,
          };
        } catch(e) {
          return {
            component: null,
            editable: false
          }
        }
      } else if (entity && entity.type === 'EMBEDDED_LINK') {
        return {
          component: Embedded,
          editable: false,
        };
      }
    } else {
      return {
        component: null,
        editable: false
      }
    }
  }
  return undefined;
};

export default getBlockRenderFunc;
