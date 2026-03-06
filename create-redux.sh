#!/bin/bash

MODULE=$1

if [ -z "$MODULE" ]; then
  echo "❌ Please provide module name"
  echo "✅ Example: ./create-redux.sh roleMaster"
  exit 1
fi

echo "🚀 Creating redux structure for: $MODULE"

mkdir -p redux/actions/${MODULE}Action
touch redux/actions/${MODULE}Action/${MODULE}Action.ts
touch redux/actions/${MODULE}Action/${MODULE}ActionInterface.ts

mkdir -p redux/reducers/${MODULE}Reducer
touch redux/reducers/${MODULE}Reducer/${MODULE}Reducer.ts
touch redux/reducers/${MODULE}Reducer/${MODULE}ReducerInterface.ts

mkdir -p redux/sagas/handlers/${MODULE}Handler
touch redux/sagas/handlers/${MODULE}Handler/${MODULE}Handler.ts
touch redux/sagas/handlers/${MODULE}Handler/${MODULE}HandlerInterface.ts

mkdir -p redux/sagas/requests/${MODULE}Request
touch redux/sagas/requests/${MODULE}Request/${MODULE}Request.ts
touch redux/sagas/requests/${MODULE}Request/${MODULE}RequestInterface.ts

echo "✅ Done!"