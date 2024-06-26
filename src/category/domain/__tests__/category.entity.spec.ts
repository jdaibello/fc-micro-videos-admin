import { Uuid } from '../../../shared/domain/value-objects/uuid.vo';
import { Category } from '../category.entity';

describe('Category Unit Tests', () => {
  describe('constructor', () => {
    test('should create a category with default values', () => {
      const category = new Category({
        name: 'Movie',
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    test('should crate a category with all values', () => {
      const created_at = new Date();

      const category = new Category({
        name: 'Movie',
        description: 'Movie description',
        is_active: false,
        created_at,
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBe('Movie description');
      expect(category.is_active).toBeFalsy();
      expect(category.created_at).toBe(created_at);
    });

    test('should create a category with name and description', () => {
      const category = new Category({
        name: 'Movie',
        description: 'Movie description',
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBe('Movie description');
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });
  });

  describe('create command', () => {
    test('should create a category with name', () => {
      const category = Category.create({
        name: 'Movie',
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    test('should create a category with name and description', () => {
      const category = Category.create({
        name: 'Movie',
        description: 'Movie description',
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBe('Movie description');
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    test('should create a category with name, description and is_active', () => {
      const category = Category.create({
        name: 'Movie',
        description: 'Movie description',
        is_active: false,
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBe('Movie description');
      expect(category.is_active).toBeFalsy();
      expect(category.created_at).toBeInstanceOf(Date);
    });
  });

  describe('category_id field', () => {
    const arrange = [{ category_id: null }, { category_id: undefined }, { category_id: new Uuid() }];

    test.each(arrange)('id = %j', ({ category_id }) => {
      const category = new Category({
        category_id: category_id as any,
        name: 'Movie',
      });

      if (category_id instanceof Uuid) {
        expect(category.category_id).toBe(category_id);
      }
    });
  });

  test('should change name', () => {
    const category = Category.create({
      name: 'Movie',
    });

    category.changeName('Series');

    expect(category.name).toBe('Series');
  });

  test('should change description', () => {
    const category = Category.create({
      name: 'Movie',
    });

    category.changeDescription('Movie description');

    expect(category.description).toBe('Movie description');
  });

  test('should activate', () => {
    const category = Category.create({
      name: 'Movie',
      is_active: false,
    });

    category.activate();

    expect(category.is_active).toBeTruthy();
  });

  test('should deactivate', () => {
    const category = Category.create({
      name: 'Movie',
    });

    category.deactivate();

    expect(category.is_active).toBeFalsy();
  });
});
