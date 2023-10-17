export enum Operators {
    Contains = 'contains',
    DoesNotContain = 'doesNotContain',
    BeginsWith = 'beginsWith',
    BeginsNotWith = 'beginsNotWith',
    EndsWith = 'endsWith',
    EndsNotWith = 'endsNotWith',
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
    static BeginsNotWith = {
        caption: 'Begins Not With',
        name: Operators.BeginsNotWith
    }
    static EndsWith = {
        caption: 'Ends With',
        name: Operators.EndsWith
    }
    static EndsNotWith = {
        caption: 'Ends Not With',
        name: Operators.EndsNotWith
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