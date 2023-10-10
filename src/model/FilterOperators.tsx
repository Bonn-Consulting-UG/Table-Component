export enum Operators {
    Contains = 'contains',
    DoesNotContain = 'doesNotContain',
    BeginsWith = 'beginsWith',
    EndsWith = 'endsWith',
    Equals = '=',
    IsNotEqual = '<>',
    MoreThan = '>',
    LessThan = '<'
}

export class FilterOperators {
    static Contains = {
        caption: 'Contains',
        name: Operators.Contains,
    }
    static DoesNotContain = {
        caption: 'Does not Contain',
        name: Operators.DoesNotContain
    }
    static BeginsWith = {
        caption: 'Begins With',
        name: Operators.BeginsWith
    }
    static EndsWith = {
        caption: 'Ends With',
        name: Operators.EndsWith
    }
    static Equals = {
        caption: 'Equals',
        name: Operators.Equals
    }
    static IsNotEqual = {
        caption: 'Is not Equal',
        name: Operators.IsNotEqual
    }
    static MoreThan = {
        caption: 'More than',
        name: Operators.MoreThan
    }
    static LessThan = {
        caption: 'Less than',
        name: Operators.LessThan
    }
}