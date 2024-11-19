from .extension import ma


class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'age')