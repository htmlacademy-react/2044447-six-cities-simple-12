import { CITIES, SortingTypes } from '../../const/const';
import { AppData } from '../../types/state';
import { makeFakeCity } from './../../mocks/mocks';
import { appData, changeCity, changeSort } from './app';

const city = makeFakeCity();
const sorting = SortingTypes[Math.floor(Math.random() * SortingTypes.length)];

describe('Reducer: appData', () => {
  let initialState: AppData;

  beforeEach(() => {
    initialState = {
      city: CITIES[0],
      sortName: SortingTypes[0],
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(appData.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  it('should set new city', () => {
    expect(appData.reducer(initialState, changeCity(city.name))).toEqual({
      ...initialState,
      city: city.name,
    });
  });

  it('should set new sorting', () => {
    expect(appData.reducer(initialState, changeSort(sorting))).toEqual({
      ...initialState,
      sortName: sorting,
    });
  });
});
