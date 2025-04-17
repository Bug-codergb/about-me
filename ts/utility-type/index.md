## Partial\<Type\>
```Partial```它可以将某个类型的所有属性变为可选属性
## Required\<Type\>
与 ```Partial<Type>``` 相反，它可以将类型中的所有可选属性转换为必需属性。
## Readonly\<Type\>
```Readonly```它可以将类型中的所有属性转换为只读属性，防止对象被修改。
## Pick\<Type, Keys\>
```Pick```它可以从一个类型中选取一组属性键来构造新类型
## Omit\<Type, Keys\>
```Omit```它可以从一个类型中排除指定的属性键，用剩余的属性构造新类型。
## Exclude\<UnionType, ExcludedMembers\>
```Exclude<UnionType, ExcludedMembers>``` 是 ```TypeScript``` 提供的实用类型，用于从联合类型中排除可以赋值给 ExcludedMembers 的类型成员。

