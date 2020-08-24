/* @flow */

import React, { Component } from 'react';
import { EditorState, convertFromRaw, convertToRaw, ContentState } from 'draft-js';
import { Editor } from '../../src';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

class ConvertFromRawDraftContent extends Component {
  constructor(props) {
    super(props);
    const json = convertFromRaw({
      "blocks": [
        {
          "key": "fmjjk",
          "text": " ",
          "type": "unstyled",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
        },
        {
          "key": "71uf6",
          "text": " ",
          "type": "atomic",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [
            {
              "offset": 0,
              "length": 1,
              "key": 0
            }
          ],
          "data": {}
        },
        {
          "key": "asunl",
          "text": "",
          "type": "unstyled",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
        },
        {
          "key": "82ek4",
          "text": "Image",
          "type": "unstyled",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
        }
      ],
      "entityMap": {
        "0": {
          "type": "IMAGE",
          "mutability": "MUTABLE",
          "data": {
            "src": "https://upload.wikimedia.org/wikipedia/commons/f/f3/ToxLogo.png",
            "height": "200px",
            "width": "200px",
            "alt" : "left"
          }
        }
      }
    });

    let markup = draftToHtml(convertToRaw(json));
    const contentBlock = htmlToDraft(markup);
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    this.state = {
      editorState,
    }
  }

  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (<div className="rdw-storybook-root">
      <span>RAW Content: <pre>{'{"blocks": [{"key": "fmjjk","text": " ","type": "unstyled","depth": 0,"inlineStyleRanges": [],"entityRanges": [],"data": {}},{"key": "71uf6","text": " ","type": "atomic","depth": 0,"inlineStyleRanges": [],"entityRanges": [{"offset": 0,"length": 1,"key": 0}],"data": {}},{"key": "asunl","text": "","type": "unstyled","depth": 0,"inlineStyleRanges": [],"entityRanges": [],"data": {}},{"key": "82ek4","text": "Image","type": "unstyled","depth": 0,"inlineStyleRanges": [],"entityRanges": [],"data": {}}],"entityMap": {"0": {"type": "IMAGE","mutability": "MUTABLE","data": {"src": "https://upload.wikimedia.org/wikipedia/commons/f/f3/ToxLogo.png","height": "200px","width": "200px","alignment": "left"}}}}'}</pre></span>
      <Editor
        toolbarHidden={true}
        readOnly={true}
        editorState={editorState}
        toolbarClassName="rdw-storybook-toolbar"
        wrapperClassName="rdw-storybook-wrapper"
        editorClassName="rdw-storybook-editor"
        onEditorStateChange={this.onEditorStateChange}
      />
    </div>);
  }
}

export default ConvertFromRawDraftContent;
