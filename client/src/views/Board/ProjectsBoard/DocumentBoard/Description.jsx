import React, { Fragment, useState } from 'react';
import { Container, Label, ButtonsContainer } from './Description.style';
import TextEdittedContent from '../../../../shared/components/TextEdittedContent/TextEdittedContent';
import TextEditor from '../../../../shared/components/TextEditor/TextEditor';
import { Hover } from '../../../../../src/shared/utils/global';
import { color } from '../../../../../src/shared/utils/styles';
import Button from '../../../../shared/components/Button/Button';

const Description = ({
  currentValue,
  updateTicketField,
  updateTicketHistory,
  onDelete, // Add onDelete prop
}) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [description, setDescription] = useState(currentValue);

  return (
    <Container>
      <Label>Note</Label>
      {isEditorOpen ? (
        <Fragment>
          <TextEditor
            value={description}
            onChange={(text) => setDescription(text)}
          />
          <ButtonsContainer>
            <Button
              text="Save"
              variant="primary"
              type="button"
              onClick={() => {
                updateTicketField({ field: 'description', value: description });
                setIsEditorOpen(false);
                updateTicketHistory('Description', null, null);
              }}
            />
            <Button
              text="Cancel"
              variant="text"
              type="button"
              onClick={() => setIsEditorOpen(false)}
            />
            <Button
              text="Delete"
              variant="danger"
              type="button"
              onClick={() => {
                onDelete(); // Call onDelete prop to delete this description
              }}
            />
          </ButtonsContainer>
        </Fragment>
      ) : (
        <Hover bgColor={color.hoverGray} borderRadius={3}>
          {/* Display the content of the description */}
          <TextEdittedContent
            content={currentValue} // Display the currentValue prop
            onClick={() => setIsEditorOpen(true)}
          />
        </Hover>
      )}
    </Container>
  );
};

export default Description;
