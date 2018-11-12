import React from "react";
import { shallow } from "enzyme";
import { initialState } from '../reducer/index';
import Rooms from "./Rooms.jsx";

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
    delPopClose: jest.fn(),
    popClose: jest.fn(),
    gochnanelRoom: jest.fn(),
    pass: initialState.pass,
    items: initialState.items,
    popopen: initialState.popopen,
    deleteAelrt: initialState.deleteAelrt
  };

  const component = shallow(
    <Rooms {...props} />
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

  it('Rooms Channel Alert Close Event', () => {
    const { component, props } = setup();
    if (props.popopen === true) {
      component.find('.fa-times').simulate('click');
      expect(props.popClose).toHaveBeenCalled();
    }
  });

  it('Rooms Channel Alert going Channel Evnet', () => {
    const { component, props } = setup();
    if (props.popopen === true) {
      if (props.pass === true) {
        component.find('.sucess-password').simulate('click');
        expect(props.gochnanelRoom).toHaveBeenCalled();
      }
    }
  });

  it('Rooms Componet Deletpop close or no event', () => {
    const { component, props } = setup();
    if (props.deleteAelrt === true) {
      component.find('.fa-times').simulate('click');
      component.find('.noButton').simulate('click');
      expect(props.delPopClose).toHaveBeenCalled();
    }
  });

  it('Rooms Componet Deletpop Yes Remove event', () => {
    const { component, props } = setup();
    if (props.deleteAelrt === true) {
      component.find('.yesButton').simulate('click');
      expect(props.roomDeletePop).toHaveBeenCalled();
    }
  });

});