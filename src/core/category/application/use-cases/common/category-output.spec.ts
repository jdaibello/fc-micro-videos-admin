import { Category } from '../../../domain/category.entity';
import { CategoryOutputMapper } from './category-output';

describe('CategoryOutputMapper', () => {
  test('should convert a category in output', () => {
    const category = Category.create({ name: 'Movie', description: 'Some description', is_active: true });
    const spyToJSON = jest.spyOn(category, 'toJSON');
    const output = CategoryOutputMapper.toOutput(category);

    expect(spyToJSON).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: category.category_id.id,
      name: 'Movie',
      description: 'Some description',
      is_active: true,
      created_at: category.created_at,
    });
  });
});
