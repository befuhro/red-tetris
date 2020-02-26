import * as React from 'react';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

enzyme.configure({adapter: new Adapter()});

import Square from '../../../../src/client/components/Room/Square';

describe('<Square/>', () => {
    describe('white square', () => {
        const component = enzyme.mount(
            <Square
                color={'realwhite'}
                size={''}
            />);
        it('should render white square', () => expect(component.html()).toMatchSnapshot());
    });

    describe('red square', () => {
        const component = enzyme.mount(
            <Square
                color={'red'}
                size={''}
            />);
        it('should render white square', () => expect(component.html()).toMatchSnapshot());
    });

    describe('darkblue square', () => {
        const component = enzyme.mount(
            <Square
                color={'darkblue'}
                size={''}
            />);
        it('should render white square', () => expect(component.html()).toMatchSnapshot());
    });

    describe('yellow square', () => {
        const component = enzyme.mount(
            <Square
                color={'yellow'}
                size={''}
            />);
        it('should render white square', () => expect(component.html()).toMatchSnapshot());
    });

    describe('green square', () => {
        const component = enzyme.mount(
            <Square
                color={'green'}
                size={''}
            />);
        it('should render white square', () => expect(component.html()).toMatchSnapshot());
    });

    describe('lightblue square', () => {
        const component = enzyme.mount(
            <Square
                color={'lightblue'}
                size={''}
            />);
        it('should render white square', () => expect(component.html()).toMatchSnapshot());
    });

    describe('purple square', () => {
        const component = enzyme.mount(
            <Square
                color={'purple'}
                size={''}
            />);
        it('should render white square', () => expect(component.html()).toMatchSnapshot());
    });

    describe('orange square', () => {
        const component = enzyme.mount(
            <Square
                color={'orange'}
                size={''}
            />);
        it('should render white square', () => expect(component.html()).toMatchSnapshot());
    });

    describe('default square', () => {
        const component = enzyme.mount(
            <Square
                color={''}
                size={''}
            />);
        it('should render white square', () => expect(component.html()).toMatchSnapshot());
    });
});
