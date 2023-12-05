import type { Meta, StoryObj } from '@storybook/react';
import React from "react";
import AppWithRedux from "../AppWithRedux";
import {Provider} from "react-redux";
import {store} from "../state/store";



// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta : Meta<typeof AppWithRedux>= {
  title: 'App/AppWithRedux',
  component: AppWithRedux,
  tags: ['autodocs'],
  argTypes: {
add:{
  action:'Button click'
}
  },
}

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args


export const AppWithReduxStory: Story = {
  render :(args)=><Provider store={store}><AppWithRedux/></Provider>


}

