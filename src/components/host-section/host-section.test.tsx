import HostSection from './host-section';
import { render, screen } from '@testing-library/react';

describe('Component: Host Section', () => {
  const mockHostInfo = {
    'id': '14432-3456tgg-xv',
    'description': 'I rent out a very sunny and bright apartment only 7 minutes walking distance to the metro station.',
    'bedrooms': 1,
    'goods': ['Baby seat', 'Cable TV', 'Coffee machine', 'Breakfast'],
    'host': {
      'name': 'Alisha',
      'avatarUrl': 'faker.image.avatar()',
      'isPro': false,
    },
    'images': ['fakeUrlPath1', 'fakeUrlPath2', 'fakeUrlPath3'],
    'maxAdults': 2,
  };

  it('should render correctly', () => {
    render(
      <HostSection hostInfo={mockHostInfo} />
    );

    expect(screen.getByText('Meet the host')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByAltText(/Host avatar/i)).toBeInTheDocument();
    expect(screen.getByText(mockHostInfo.host.name)).toBeInTheDocument();
    expect(screen.getByText(mockHostInfo.description)).toBeInTheDocument();
  });
});
