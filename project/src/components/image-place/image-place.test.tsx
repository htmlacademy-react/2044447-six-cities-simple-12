import { render, screen } from '@testing-library/react';
import ImagePlace from './image-place';
import { datatype } from 'faker';
import { MemoryRouter } from 'react-router-dom';

const previewImage = datatype.string();
const id = datatype.number();
const title = datatype.string();
const type = 'home';

describe('Component: ImagePlace', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <ImagePlace
          previewImage={previewImage}
          id={id}
          title={title}
          type={type}
        />
      </MemoryRouter>
    );

    const altElement = screen.getByAltText(title);

    expect(altElement).toBeInTheDocument();
  });
});
