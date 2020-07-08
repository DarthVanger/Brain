import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MindMap, Node, Edge } from 'circular-mind-map-react';

import { VisNetworkHelper } from 'helpers/visNetworkHelper';
import noteStorage from 'storage/noteStorage';
import { NoteNameEditorComponent } from 'components/NoteNameEditor/NoteNameEditorComponent';
import { StyledNotesMindMap } from 'components/NotesMindMap/NotesMindMapStyles';
import { NoteDetailsContainer } from 'components/NoteDetails/NoteDetailsContainer';

const scrollByMouseDrag = (() => el => {
  const element = el.current;
  let isMouseDown = false;
  const clickPosition = {};

  const scroll = e => {
    element.scroll(e.pageX - clickPosition.x, e.pageY - clickPosition.y);
  };

  const pauseEvent = e => {
    e.stopPropagation();
    e.preventDefault();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
  };

  return {
    onMouseMove: e => {
      pauseEvent(e);
      isMouseDown && scroll(e);
    },
    onMouseDown: e => {
      e.persist();
      pauseEvent(e);
      const isClickOnSvg = e.target == element.querySelector('svg');
      if (isClickOnSvg) {
        isMouseDown = true;
        clickPosition.y = e.pageY - element.scrollTop;
        clickPosition.x = e.pageX - element.scrollLeft;
        element.style.cursor = 'grab';
      }
    },
    onMouseUp: e => {
      isMouseDown = false;
      element.style.cursor = 'auto';
    },
  };
})();

export class NotesMindMapComponent extends Component {
  constructor(props) {
    super(props);
    this.mindMapContainerRef = React.createRef();
  }

  render() {
    const {
      selectedNote,
      showNoteNameEditor,
      isChangeParentModeActive,
      nodes,
      edges,
    } = this.props;

    return (
      <>
        <StyledNotesMindMap
          {...scrollByMouseDrag(this.mindMapContainerRef)}
          ref={this.mindMapContainerRef}>
          {selectedNote && <NoteDetailsContainer />}
          <MindMap
            nodes={nodes.map(n => (
              <Node
                id={n.id}
                label={n.label}
                onClick={() => this.handleNodeClick(n)}
                onDoubleClick={() => this.doubleClickHandler(n)}
              />
            ))}
            edges={edges.map(e => (
              <Edge {...e} />
            ))}
          />
        </StyledNotesMindMap>

        {showNoteNameEditor && (
          <NoteNameEditorComponent
            note={selectedNote}
            onChange={this.handleNoteNameUpdate}
            onChangeParentClick={this.props.onChangeParentButtonClick}
            onDeleteClick={this.onDeleteClick}
            isChangeParentModeActive={isChangeParentModeActive}
          />
        )}
      </>
    );
  }

  handleNodeClick(targetNode) {
    this.props.onMindMapClick();
    console.log('node clicked', targetNode);
    const { selectedNote } = this.props;

    // if clicking on the current note, do nothing.
    if (targetNode.id === selectedNote.id) return;

    const nodes = this.props.nodes;

    const targetNote = nodes.find(note => note.id === targetNode.id);

    if (!targetNote) {
      throw new Error(
        "noteClickHandler(): couldn't find targetNode: ",
        targetNode,
      );
    }

    this.props.changeSelectedNote({
      note: targetNote,
      edges: this.props.edges,
    });
  }

  visNetworkClickHandler = event => {
    const { selectedNote } = this.props;
    const { edges } = this.props;
    const { isChangeParentModeActive } = this.props;

    if (VisNetworkHelper.clickedOnNote(event)) {
      let targetNoteId = VisNetworkHelper.getTargetNoteId(event);
      const targetNote = this.props.nodes.find(
        note => note.id === targetNoteId,
      );

      if (isChangeParentModeActive) {
        this.props.changeParentNote({
          noteId: selectedNote.id,
          currentParentId: edges.find(edge => edge.to === selectedNote.id).id,
          newParent: targetNote,
          edges,
        });
      } else {
        if (targetNote.id !== selectedNote.id) {
          this.props.changeSelectedNote({
            note: targetNote,
            edges: this.props.edges,
          });
        }
      }
    }
  };

  doubleClickHandler = targetNode => {
    const { nodes } = this.props;
    const targetNote = nodes.find(node => node.id === targetNode.id);
    this.props.createEmptyChild({ parent: targetNote });
  };

  visNetworkHoldHandler = event => {
    const { nodes } = this.props;
    if (VisNetworkHelper.clickedOnNote(event)) {
      let targetNoteId = VisNetworkHelper.getTargetNoteId(event);
      const targetNote = nodes.find(node => node.id === targetNoteId);
      this.editNote(targetNote);
    }
  };

  editNote(targetNote) {
    const { nodes } = this.props;
    const note = nodes.find(node => node.id === targetNote.id);

    if (note.name === noteStorage.APP_FOLDER_NAME || !note.isNote) {
      return;
    }

    this.props.editNote(note);
  }

  handleNoteNameUpdate = newName => {
    const note = this.props.selectedNote;
    this.props.updateNoteName({ note, newName });
  };

  onDeleteClick = () => {
    let note = this.props.selectedNote;
    this.props.deleteNote({ note });
  };
}

NotesMindMapComponent.propTypes = {
  selectedNote: PropTypes.object.isRequired,
  changeSelectedNote: PropTypes.func.isRequired,
  createEmptyChild: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  isChangeParentModeActive: PropTypes.bool.isRequired,
  changeParentNote: PropTypes.func.isRequired,
  showNoteNameEditor: PropTypes.bool.isRequired,
  nodes: PropTypes.array.isRequired,
  edges: PropTypes.array.isRequired,
  onMindMapClick: PropTypes.func.isRequired,
  editNote: PropTypes.func.isRequired,
  updateNoteName: PropTypes.func.isRequired,
  onChangeParentButtonClick: PropTypes.func.isRequired,
};
