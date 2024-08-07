import { CategoryModel } from '../category.model';
import { CategoryModelMapper } from '../category.model.mapper';
import { EntityValidationError } from '../../../../../shared/domain/validators/validation.error';
import { Category } from '../../../../domain/category.entity';
import { Uuid } from '../../../../../shared/domain/value-objects/uuid.vo';
import { setupSequelize } from '../../../../../shared/infra/testing/helpers';

describe('CategoryModelMapper Integration Tests', () => {
  setupSequelize({ models: [CategoryModel] });

  test('should throw error when category is invalid', () => {
    const model = CategoryModel.build({
      category_id: '9366b7dc-2d71-4799-b91c-c64adb205104',
    });

    try {
      CategoryModelMapper.toEntity(model);
      fail('The category is valid, but it needs to throw a EntityValidationError');
    } catch (e) {
      expect(e).toBeInstanceOf(EntityValidationError);
      expect((e as EntityValidationError).error).toMatchObject({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters',
        ],
      });
    }
  });

  it('should convert a category model to a category entity', () => {
    const created_at = new Date();
    const model = CategoryModel.build({
      category_id: '5490020a-e866-4229-9adc-aa44b83234c4',
      name: 'some value',
      description: 'some description',
      is_active: true,
      created_at,
    });

    const entity = CategoryModelMapper.toEntity(model);

    expect(entity.toJSON()).toStrictEqual(
      new Category({
        category_id: new Uuid('5490020a-e866-4229-9adc-aa44b83234c4'),
        name: 'some value',
        description: 'some description',
        is_active: true,
        created_at,
      }).toJSON(),
    );
  });

  test('should convert a category entity to a category model', () => {
    const created_at = new Date();
    const entity = new Category({
      category_id: new Uuid('5490020a-e866-4229-9adc-aa44b83234c4'),
      name: 'some value',
      description: 'some description',
      is_active: true,
      created_at,
    });

    const model = CategoryModelMapper.toModel(entity);

    expect(model.toJSON()).toStrictEqual({
      category_id: '5490020a-e866-4229-9adc-aa44b83234c4',
      name: 'some value',
      description: 'some description',
      is_active: true,
      created_at,
    });
  });
});
