import { renderHook } from '@testing-library/react';
import { Map } from 'leaflet';
import { MutableRefObject } from 'react';
import { makeFakeCity } from '../mocks/mocks';
import useMap from './use-map';

const mapRef: MutableRefObject<HTMLElement | null> = {
  current: document.createElement('div'),
};

describe('Hook: useMap', () => {
  const city = makeFakeCity();

  it('should return instance of Map', () => {
    const { result } = renderHook(() => useMap(mapRef, city));

    expect(result.current).toBeInstanceOf(Map);
  });
});
