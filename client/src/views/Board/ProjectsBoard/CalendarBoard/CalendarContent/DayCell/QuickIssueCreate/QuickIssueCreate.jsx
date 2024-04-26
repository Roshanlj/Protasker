import React, { useState, Fragment, useRef, useEffect } from 'react';
import {
  IssueTypes,
  IssuePriorities,
} from '../../../../../../../shared/constants/issues';
import Icon from '../../../../../../../shared/components/Icon/Icon';
import SelectMenu from '../../../../../../../shared/components/SelectMenu/SelectMenu';
import { selectUser } from '../../../../../../../redux/auth/auth.selectors';
import { selectCurrentProject } from '../../../../../../../redux/projects/projects.selectors';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { createNewTicket } from '../../../../../../../redux/tickets/tickets.actions';
import useOutsideClick from '../../../../../../../shared/hooks/useOutsideClick';
import {
  Container,
  TextArea,
  DueDate,
  DropDownMenu,
  Content,
  Button,
  IconCont,
  AngleDownIcon,
  Bottom,
  TimeInputWrapper
} from './QuickIssueCreate.style';
import { setAlert } from '../../../../../../../redux/alert/alert.actions';
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from '@supabase/auth-helpers-react';
import DateTimePicker from 'react-datetime-picker';

const QuickIssueCreate = ({
  momentDate,
  setIsContentActive,
  project,
  user,
  createNewTicket,
  setAlert,
}) => {
  const [isActive, setIsActive] = useState(false);
  const contentRef = useRef();
  const [issueFormValues, setIssueFormValues] = useState({
    issueType: IssueTypes.TASK,
    summary: '',
    description: '',
    reporterId: user._id,
    assigneeId: '',
    issuePriority: IssuePriorities.MEDIUM,
  });
  const { issueType, summary, startTime, endTime } = issueFormValues;

  useOutsideClick(contentRef, () => {
    setIsContentActive(false);
  });

  useEffect(() => {
    scrollIntoViewIfNeeded(contentRef.current);
  }, []);

  function scrollIntoViewIfNeeded(target) {
    // @TODO: Figure out a better way of handling this.
    const targetTop = 230;
    if (target.getBoundingClientRect().top < targetTop) {
      target.scrollIntoView();
    }

    if (target.getBoundingClientRect().bottom > window.innerHeight) {
      target.scrollIntoView(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const columnId = project.columnOrder[0];

    issueFormValues.projectId = project._id;
    issueFormValues.dueDate = momentDate;
    issueFormValues.columnId = columnId;
    issueFormValues.linkedEpic = null;
    var dueDate = moment(momentDate, 'MMM DD, YYYY').toDate();

    // Get the start date by adding time (e.g., start of day)
    const startDate = moment(momentDate).set('hour', startTime.split(':')[0]).set('minute', startTime.split(':')[1]).toDate();
    const endDate = moment(momentDate).set('hour', endTime.split(':')[0]).set('minute', endTime.split(':')[1]).toDate();
    // Add an issue to the first column of the board.
    createNewTicket(issueFormValues, columnId);
    // Close the content.
    setIsContentActive(false);
    setAlert('A new issue is created !', 'success');

    createCalendarEvent(issueFormValues.summary,issueFormValues.description, startDate, endDate)
      .then(() => {
        // Handle successful creation of calendar event
        console.log('Calendar event created successfully');
      })
      .catch((error) => {
        // Handle error
        console.error('Error creating calendar event:', error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setIssueFormValues({ ...issueFormValues, [name]: value });
  };

  const checkIsFirstWeekOfCalendar = (momentDate) => {
    const dateStart = moment()
      .subtract(12, 'months')
      .startOf('month')
      .day('Sunday');
    return moment(momentDate).isSame(dateStart, 'week');
  };

  const session = useSession();
  const supabase = useSupabaseClient();
  const { isLoading } = useSessionContext();

  if (isLoading) {
    return <></>;
  }

  async function createCalendarEvent(summary, description, start, end) {
    console.log("Creating calendar event");
    const event = {
      summary: summary,
      description: description,
      start: {
        dateTime: start.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    };
    await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + session.provider_token
      },
      body: JSON.stringify(event)
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        alert("Event created, check your Google Calendar!");
      });
  }
  



  var dueDate = moment(momentDate, 'MMM DD, YYYY').toDate();
  var start = new Date(dueDate);

  return (      
        <Container
          ref={contentRef}
          isLeftPosition={momentDate.day() >= 4}
          isFirstWeekOfCalendar={checkIsFirstWeekOfCalendar(momentDate)}
        >
          {session ? (
            <>
          <h4>Create Event</h4>
          <form onSubmit={handleSubmit}>
            <TextArea
              placeholder="What needs to be done?"
              name="summary"
              value={summary}
              onChange={handleChange}
              required
            />
            <TextArea
            placeholder="Description"
            name="description"
            value={issueFormValues.description}
            onChange={handleChange}
            required
          />
          <div>
            <TimeInputWrapper>
          <label htmlFor="startTime">Start Time:</label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={startTime}
            onChange={handleChange}
            required
          /></TimeInputWrapper>
        </div>
        <div>
        <TimeInputWrapper>
          <label htmlFor="endTime">End Time:</label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={endTime}
            onChange={handleChange}
            required
          /></TimeInputWrapper>
        </div>
            <DueDate>
              <span>Due date :</span> {momentDate.format('MMM DD, YYYY')}
            </DueDate>
            <Bottom>
              <DropDownMenu>
                <Content onClick={() => setIsActive(true)}>
                  <Icon type={issueType.toLowerCase()} size={12} />
                  <AngleDownIcon>
                    <Icon type="angle-down" size={13} isSolid={true} />
                  </AngleDownIcon>
                </Content>
                <SelectMenu
                  isActive={isActive}
                  width={150}
                  setIsMenuOpen={setIsActive}
                  onChange={(option) =>
                    setIssueFormValues({
                      ...issueFormValues,
                      issueType: option.value,
                    })
                  }
                  options={renderType(IssueTypes, issueType)}
                  renderValue={({ value: issueType }) =>
                    renderOption(issueType)
                  }
                />
              </DropDownMenu>
              <Button type="submit" value="Create" />
            </Bottom>
          </form>
          </>
          ) : (<><p>&nbsp;&nbsp;</p>
          <p>Please login to create an event.</p><p>&nbsp;&nbsp;</p></>)
        }
        </Container>
  );
};

const renderType = (IssueTypes, currentType) =>
  Object.values(IssueTypes)
    .filter((type) => type !== currentType && type !== IssueTypes.EPIC)
    .map((option) => ({
      key: option,
      value: option,
    }));

const renderOption = (issueType) => (
  <Fragment>
    <IconCont>
      <Icon type={issueType.toLowerCase()} size={12} top={-1} />
    </IconCont>
    {issueType}
  </Fragment>
);

QuickIssueCreate.propTypes = {
  user: PropTypes.object.isRequired,
  createNewTicket: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  project: selectCurrentProject,
});

export default connect(mapStateToProps, { createNewTicket, setAlert })(
  QuickIssueCreate
);
