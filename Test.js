JSON.Stringify(
    {value,},(k,v) => k==="entry-expression"
    || k==="expression-Json"
    || k==="scope-expression"
    || k==="scope-methods" ? undefined:v,
    2

)
