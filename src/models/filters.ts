import * as t from "io-ts";
import { NumberFromString } from "io-ts-types/lib/NumberFromString";
import { NonEmptyString } from "io-ts-types/lib/NonEmptyString";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nonEmptyArray } from "io-ts-types/lib/nonEmptyArray";

export const DimensionTypes = t.union([
  t.literal("percentage"),
  t.literal("absolute"),
  t.literal("string"),
  t.literal("boolean"),
  t.literal("date"),
]);

export type DimensionTypes = t.TypeOf<typeof DimensionTypes>;

export const AggregationOperators = t.type({
  calculated: t.any,
  enabled: t.any,
});

export type AggregationOperators = t.TypeOf<typeof AggregationOperators>;

export const NumberProperty = t.type({
  property: t.string,
  type: t.literal("integer"),
  property_display_name: t.string,
  no_data_filter: t.boolean,
  table: t.string,
  dimension_type: DimensionTypes,
  aggregation: t.string,
  aggregation_operators: AggregationOperators,
  action_collection: t.string,
});
export type NumberProperty = t.TypeOf<typeof NumberProperty>;

export const StringProperty = t.type({
  property: t.string,
  type: t.literal("string"),
  property_display_name: t.string,
  no_data_filter: t.boolean,
  table: t.string,
  dimension_type: DimensionTypes,
  aggregation: t.string,
  aggregation_operators: AggregationOperators,
  action_collection: t.string,
});
export type StringProperty = t.TypeOf<typeof StringProperty>;

export const DateProperty = t.type({
  property: t.string,
  type: t.literal("date"),
  property_display_name: t.string,
  no_data_filter: t.boolean,
  table: t.string,
  dimension_type: DimensionTypes,
  aggregation: t.string,
  aggregation_operators: AggregationOperators,
  action_collection: t.string,
});
export type DateProperty = t.TypeOf<typeof DateProperty>;

export const BooleanProperty = t.type({
  property: t.string,
  type: t.literal("boolean"),
  property_display_name: t.string,
  no_data_filter: t.boolean,
  table: t.string,
  dimension_type: DimensionTypes,
  aggregation: t.string,
  aggregation_operators: AggregationOperators,
  action_collection: t.string,
});
export type BooleanProperty = t.TypeOf<typeof BooleanProperty>;

export const Property = t.union([
  StringProperty,
  NumberProperty,
  DateProperty,
  BooleanProperty,
]);
export type Property = t.TypeOf<typeof Property>;

export const Properties = t.array(Property);
export type Properties = t.TypeOf<typeof Properties>;

export const NumberConditions = t.union([
  t.literal("lt"),
  t.literal("lte"),
  t.literal("gt"),
  t.literal("gte"),
  t.literal("eq"),
  t.literal("neq"),
]);

export type NumberConditions = t.TypeOf<typeof NumberConditions>;

export const StringConditions = t.union([t.literal("in"), t.literal("nin")]);

export type StringConditions = t.TypeOf<typeof StringConditions>;

export const BooleanConditions = t.literal("eq");

export type BooleanConditions = t.TypeOf<typeof BooleanConditions>;

export const Value = t.union([t.string, t.number]);
export type Value = t.TypeOf<typeof Value>;

// TODO: make branded UUID
export const ID = t.union([t.undefined, t.string]);
export type ID = t.TypeOf<typeof ID>;

export const NumberValues = withMessage(
  nonEmptyArray(t.union([NumberFromString, t.number])),
  () => "Please enter only numbers",
);
export type NumberValues = t.TypeOf<typeof NumberValues>;

export const NumberBase = t.type({
  id: ID,
  condition: withMessage(NumberConditions, () => "Number operator is required"),
  values: NumberValues,
  property: t.string,
  type: t.literal("integer"),
});

export type NumberBase = t.TypeOf<typeof NumberBase>;

export const NumberFilter = NumberBase;
export type NumberFilter = t.TypeOf<typeof NumberFilter>;

export const StringValues = withMessage(
  nonEmptyArray(NonEmptyString),
  () => "String value is required",
);
export type StringValues = t.TypeOf<typeof StringValues>;

export const BooleanValues = withMessage(
  nonEmptyArray(t.boolean),
  () => "Boolean value is required",
);
export type BooleanValues = t.TypeOf<typeof BooleanValues>;

export const Values = t.union([StringValues, NumberValues]);
export type Values = t.TypeOf<typeof Values>;

export const StringBase = t.type({
  id: ID,
  condition: withMessage(StringConditions, () => "String operator is required"),
  values: StringValues,
  property: t.string,
  type: t.literal("string"),
});
export type StringBase = t.TypeOf<typeof StringFilter>;

export const StringFilter = StringBase;
export type StringFilter = t.TypeOf<typeof StringFilter>;

export const DateBase = t.type({
  id: ID,
  condition: withMessage(StringConditions, () => "Date operator is required"),
  values: StringValues,
  property: t.string,
  type: t.literal("date"),
});
export type DateBase = t.TypeOf<typeof DateBase>;

export const DateFilter = DateBase;
export type DateFilter = t.TypeOf<typeof DateFilter>;

export const BooleanBase = t.type({
  id: ID,
  condition: withMessage(
    BooleanConditions,
    () => "Boolean operator is required",
  ),
  values: BooleanValues,
  property: t.string,
  type: t.literal("boolean"),
});
export type BooleanBase = t.TypeOf<typeof BooleanBase>;

export const BooleanFilter = BooleanBase;
export type BooleanFilter = t.TypeOf<typeof BooleanFilter>;

export const Filter = t.union([
  NumberFilter,
  StringFilter,
  DateFilter,
  BooleanFilter,
]);
export type Filter = t.TypeOf<typeof Filter>;

export const Filters = t.array(Filter);
export type Filters = t.TypeOf<typeof Filters>;

// TODO: infer this type from existing conditions
export type ConditionLabels = {
  string: {
    in: string;
    nin: string;
  };
  integer: {
    lt: string;
    lte: string;
    gt: string;
    gte: string;
    eq: string;
    neq: string;
  };
  date: {
    in: string;
    nin: string;
  };
  boolean: {
    eq: string;
  };
};

// TODO: make type safe and remove condition duplications
type Conditions = {
  string: StringConditions[];
  integer: NumberConditions[];
  date: StringConditions[];
  boolean: BooleanConditions[];
};
export const conditions: Conditions = {
  string: ["in", "nin"],
  integer: ["lt", "lte", "gt", "gte", "eq", "neq"],
  date: ["in", "nin"],
  boolean: ["eq"],
};

export const conditionLabels: ConditionLabels = {
  string: {
    in: "Is",
    nin: "Is Not",
  },
  integer: {
    lt: "Lesser",
    lte: "Lesser or Equal",
    gt: "Greater",
    gte: "Greater or Equal",
    eq: "Equal",
    neq: "Not Equal",
  },
  date: {
    in: "Is",
    nin: "Is Not",
  },
  boolean: {
    eq: "Equal",
  },
};
