import { CategoryModel } from '../category.model';
import { Category } from '../../../../domain/category.entity';
import { setupSequelize } from '../../../../../shared/infra/testing/helpers';
import { DataType } from 'sequelize-typescript';

describe('CategoryModel Integration Tests', () => {
  setupSequelize({ models: [CategoryModel] });

  test('mapping props', () => {
    const attributesMap = CategoryModel.getAttributes();
    const attributes = Object.keys(attributesMap);
    expect(attributes).toEqual(['category_id', 'name', 'description', 'is_active', 'created_at']);

    const categoryIdAttr = attributesMap.category_id;
    expect(categoryIdAttr).toMatchObject({
      field: 'category_id',
      fieldName: 'category_id',
      primaryKey: true,
      type: DataType.UUID(),
    });

    const nameAttr = attributesMap.name;
    expect(nameAttr).toMatchObject({
      field: 'name',
      fieldName: 'name',
      allowNull: false,
      type: DataType.STRING(255),
    });

    const descriptionAttr = attributesMap.description;
    expect(descriptionAttr).toMatchObject({
      field: 'description',
      fieldName: 'description',
      allowNull: true,
      type: DataType.TEXT(),
    });

    const isActiveAttr = attributesMap.is_active;
    expect(isActiveAttr).toMatchObject({
      field: 'is_active',
      fieldName: 'is_active',
      allowNull: false,
      type: DataType.BOOLEAN(),
    });

    const createdAtAttr = attributesMap.created_at;
    expect(createdAtAttr).toMatchObject({
      field: 'created_at',
      fieldName: 'created_at',
      allowNull: false,
      type: DataType.DATE(3),
    });
  });

  test('create', async () => {
    const arrange = Category.fake().aCategory().build().toJSON();

    const category = await CategoryModel.create(arrange);

    expect(category.toJSON()).toStrictEqual(arrange);
  });
});
