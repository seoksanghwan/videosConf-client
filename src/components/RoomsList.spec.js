import React from "react";
import { shallow } from "enzyme";
import { initialState } from '../reducer/index';
import RoomsList from "./RoomsList.jsx";

const setup = () => {
  const props = {
    isroom: [
      {
        _id: "ObjectId",
        roomPassword: "hashpassword",
        title: "title",
        userMail: "Email",
        userName: "Name",
        userSalt: "saltKey"
      }
    ],
    keys: 'keys',
    popEvent: jest.fn(),
    roomDelete: jest.fn(),
    items: initialState.items
  };

  const component = shallow(
    <RoomsList {...props} />
  );

  return {
    component,
    props
  }
}

describe('Rooms component', () => {
  it('Rooms data list', () => {
    const { component } = setup();
    expect(component.find('dd')).toHaveLength(1);
  });

  it('Rooms list focus Click Stance Event', () => {
    const { component, props } = setup();
    if (props.isroom.length) {
      component.find('dd').forEach((node, index) => {
        component.find(".channelEnter").simulate("click");
        expect(props.popEvent).toHaveBeenCalled();
      });
    }
  });

  it('Rooms Organiser list focus Click Remove Event', () => {
    const { component, props } = setup();
    component.find('dd').forEach((node, index) => {
      props.isroom.filter(data => {
        if (data === props.items) {
          component.find(".channelRemove").simulate("click");
          expect(props.roomDelete).toHaveBeenCalled();
        }
      });
    });
  });

});