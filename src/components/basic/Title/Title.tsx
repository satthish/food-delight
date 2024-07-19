//Common title component
//Wite custom common properties to use it across application
import React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';

interface TitleProps extends TypographyProps {
  align?: 'left' | 'center' | 'right';
  content?: string;
}

const Title: React.FC<TitleProps> = ({ align = 'left', content, ...typographyProps }) => {
  return (
    <Typography align={align} {...typographyProps}>
      {content || "Default title"}
    </Typography>
  );
};

export default Title;
