import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import classNames from 'classnames';
import Option from '../../components/Option';
import './styles.css';

const getImageComponent = config => class Image extends Component {
  static propTypes: Object = {
    block: PropTypes.object,
    contentState: PropTypes.object,
  };

  state: Object = {
    hovered: false,
  };

  setEntityAlignmentLeft: Function = (): void => {
    this.setEntityAlignment('left');
  };

  setEntityAlignmentRight: Function = (): void => {
    this.setEntityAlignment('right');
  };

  setEntityAlignmentCenter: Function = (): void => {
    this.setEntityAlignment('none');
  };

  setEntityAlignment: Function = (alignment): void => {
    const { block, contentState } = this.props;
    const entityKey = block.getEntityAt(0);
    contentState.mergeEntityData(
      entityKey,
      { alt: alignment },
    );
    config.onChange(EditorState.push(config.getEditorState(), contentState, 'change-block-data'));
    this.setState({
      dummy: true,
    });
  };

  toggleHovered: Function = (): void => {
    const hovered = !this.state.hovered;
    this.setState({
      hovered,
    });
  };

  renderAlignmentOptions(alignment): Object {
    return (
      <div
        className={classNames(
          'rdw-image-alignment-options-popup',
          {
            'rdw-image-alignment-options-popup-right': alignment === 'right',
          },
        )}
      >
        <Option
          onClick={this.setEntityAlignmentLeft}
          className="rdw-image-alignment-option"
        >
          L
        </Option>
        <Option
          onClick={this.setEntityAlignmentCenter}
          className="rdw-image-alignment-option"
        >
          C
        </Option>
        <Option
          onClick={this.setEntityAlignmentRight}
          className="rdw-image-alignment-option"
        >
          R
        </Option>
      </div>
    );
  }

  render(): Object {
    const { block, contentState } = this.props;
    const { hovered } = this.state;
    const { isReadOnly, isImageAlignmentEnabled } = config;
    let entity = null
    try{
      entity = contentState.getEntity(block.getEntityAt(0));
      const { src, height, width, alt } = entity.getData();
      // alignment is not propogated
      // https://github.com/facebook/draft-js/blob/882a4d0cc75acb90608d4e0a1f96eb57197c9e34/src/model/encoding/convertFromHTMLToContentBlocks.js#L62

      let rdw_image_center = {
        display: 'flex',
        justifyContent: 'center'
      }
      let rdw_image_left = {
        display: 'flex',
        justifyContent: 'flex-start'
      }
      let rdw_image_right = {
        display: 'flex',
        justifyContent: 'flex-end'
      }

      let rdw_image_position = rdw_image_center;
      if(alt === 'left') rdw_image_position = rdw_image_left;
      if(alt === 'right') rdw_image_position = rdw_image_right;

      return (
        <span
          onMouseEnter={this.toggleHovered}
          onMouseLeave={this.toggleHovered}
          style={
            rdw_image_position
          }
          className={classNames(
            'rdw-image-alignment',
            {
              'rdw-image-left': alt === 'left',
              'rdw-image-right': alt === 'right',
              'rdw-image-center': !alt || alt === 'none',
            },
          )}
        >
          <span className="rdw-image-imagewrapper">
            <img
              src={src}
              alt={alt}
              style={{
                height,
                width
              }}
            />
            {
              !isReadOnly() && hovered && isImageAlignmentEnabled() ?
                this.renderAlignmentOptions(alt)
                :
                undefined
            }
          </span>
        </span>
      );
    } catch(e) {
      return (<p></p>)
    }
  }
};

export default getImageComponent;
