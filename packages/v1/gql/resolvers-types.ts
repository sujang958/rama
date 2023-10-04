import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type BaseDocument = {
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type BaseRevision = {
  additions: Scalars['Int']['output'];
  authorId: Scalars['String']['output'];
  changes: Array<Maybe<Scalars['JSON']['output']>>;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletions: Scalars['Int']['output'];
  documentId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type BaseUser = {
  createdAt: Scalars['DateTime']['output'];
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastActivity: Scalars['DateTime']['output'];
  picture: Scalars['String']['output'];
};

export type BaseUserToDocument = {
  createdAt: Scalars['DateTime']['output'];
  documentId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type DocumentWithRelations = BaseDocument & {
  __typename?: 'DocumentWithRelations';
  content: Scalars['String']['output'];
  contributors: Array<Maybe<UserToDocumentWithoutRelations>>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  revisions: Array<Maybe<RevisionWithoutRelations>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type DocumentWithoutRelations = BaseDocument & {
  __typename?: 'DocumentWithoutRelations';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  document?: Maybe<DocumentWithRelations>;
  revision?: Maybe<RevisionWithRelations>;
  revisions: Array<Maybe<RevisionWithRelations>>;
  user?: Maybe<UserWithRelations>;
  version: Scalars['String']['output'];
};


export type QueryDocumentArgs = {
  id: Scalars['String']['input'];
};


export type QueryRevisionArgs = {
  id: Scalars['String']['input'];
};


export type QueryRevisionsArgs = {
  documentId: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};

export type RevisionWithRelations = BaseRevision & {
  __typename?: 'RevisionWithRelations';
  additions: Scalars['Int']['output'];
  author?: Maybe<UserWithoutRelations>;
  authorId: Scalars['String']['output'];
  changes: Array<Maybe<Scalars['JSON']['output']>>;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletions: Scalars['Int']['output'];
  document?: Maybe<DocumentWithoutRelations>;
  documentId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type RevisionWithoutRelations = BaseRevision & {
  __typename?: 'RevisionWithoutRelations';
  additions: Scalars['Int']['output'];
  authorId: Scalars['String']['output'];
  changes: Array<Maybe<Scalars['JSON']['output']>>;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletions: Scalars['Int']['output'];
  documentId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type UserToDocumentWithRelations = BaseUserToDocument & {
  __typename?: 'UserToDocumentWithRelations';
  createdAt: Scalars['DateTime']['output'];
  document?: Maybe<DocumentWithoutRelations>;
  documentId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  user?: Maybe<UserWithoutRelations>;
  userId: Scalars['String']['output'];
};

export type UserToDocumentWithoutRelations = BaseUserToDocument & {
  __typename?: 'UserToDocumentWithoutRelations';
  createdAt: Scalars['DateTime']['output'];
  documentId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type UserWithRelations = BaseUser & {
  __typename?: 'UserWithRelations';
  contributions: Array<Maybe<UserToDocumentWithoutRelations>>;
  createdAt: Scalars['DateTime']['output'];
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastActivity: Scalars['DateTime']['output'];
  picture: Scalars['String']['output'];
  revisions: Array<Maybe<RevisionWithoutRelations>>;
};

export type UserWithoutRelations = BaseUser & {
  __typename?: 'UserWithoutRelations';
  createdAt: Scalars['DateTime']['output'];
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastActivity: Scalars['DateTime']['output'];
  picture: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping of interface types */
export type ResolversInterfaceTypes<RefType extends Record<string, unknown>> = {
  BaseDocument: ( DocumentWithRelations ) | ( DocumentWithoutRelations );
  BaseRevision: ( RevisionWithRelations ) | ( RevisionWithoutRelations );
  BaseUser: ( UserWithRelations ) | ( UserWithoutRelations );
  BaseUserToDocument: ( UserToDocumentWithRelations ) | ( UserToDocumentWithoutRelations );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  BaseDocument: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['BaseDocument']>;
  BaseRevision: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['BaseRevision']>;
  BaseUser: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['BaseUser']>;
  BaseUserToDocument: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['BaseUserToDocument']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  DocumentWithRelations: ResolverTypeWrapper<DocumentWithRelations>;
  DocumentWithoutRelations: ResolverTypeWrapper<DocumentWithoutRelations>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Query: ResolverTypeWrapper<{}>;
  RevisionWithRelations: ResolverTypeWrapper<RevisionWithRelations>;
  RevisionWithoutRelations: ResolverTypeWrapper<RevisionWithoutRelations>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UserToDocumentWithRelations: ResolverTypeWrapper<UserToDocumentWithRelations>;
  UserToDocumentWithoutRelations: ResolverTypeWrapper<UserToDocumentWithoutRelations>;
  UserWithRelations: ResolverTypeWrapper<UserWithRelations>;
  UserWithoutRelations: ResolverTypeWrapper<UserWithoutRelations>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  BaseDocument: ResolversInterfaceTypes<ResolversParentTypes>['BaseDocument'];
  BaseRevision: ResolversInterfaceTypes<ResolversParentTypes>['BaseRevision'];
  BaseUser: ResolversInterfaceTypes<ResolversParentTypes>['BaseUser'];
  BaseUserToDocument: ResolversInterfaceTypes<ResolversParentTypes>['BaseUserToDocument'];
  Boolean: Scalars['Boolean']['output'];
  DateTime: Scalars['DateTime']['output'];
  DocumentWithRelations: DocumentWithRelations;
  DocumentWithoutRelations: DocumentWithoutRelations;
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  Query: {};
  RevisionWithRelations: RevisionWithRelations;
  RevisionWithoutRelations: RevisionWithoutRelations;
  String: Scalars['String']['output'];
  UserToDocumentWithRelations: UserToDocumentWithRelations;
  UserToDocumentWithoutRelations: UserToDocumentWithoutRelations;
  UserWithRelations: UserWithRelations;
  UserWithoutRelations: UserWithoutRelations;
};

export type BaseDocumentResolvers<ContextType = any, ParentType extends ResolversParentTypes['BaseDocument'] = ResolversParentTypes['BaseDocument']> = {
  __resolveType: TypeResolveFn<'DocumentWithRelations' | 'DocumentWithoutRelations', ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type BaseRevisionResolvers<ContextType = any, ParentType extends ResolversParentTypes['BaseRevision'] = ResolversParentTypes['BaseRevision']> = {
  __resolveType: TypeResolveFn<'RevisionWithRelations' | 'RevisionWithoutRelations', ParentType, ContextType>;
  additions?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  authorId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  changes?: Resolver<Array<Maybe<ResolversTypes['JSON']>>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deletions?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  documentId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type BaseUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['BaseUser'] = ResolversParentTypes['BaseUser']> = {
  __resolveType: TypeResolveFn<'UserWithRelations' | 'UserWithoutRelations', ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastActivity?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  picture?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type BaseUserToDocumentResolvers<ContextType = any, ParentType extends ResolversParentTypes['BaseUserToDocument'] = ResolversParentTypes['BaseUserToDocument']> = {
  __resolveType: TypeResolveFn<'UserToDocumentWithRelations' | 'UserToDocumentWithoutRelations', ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  documentId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DocumentWithRelationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['DocumentWithRelations'] = ResolversParentTypes['DocumentWithRelations']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contributors?: Resolver<Array<Maybe<ResolversTypes['UserToDocumentWithoutRelations']>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  revisions?: Resolver<Array<Maybe<ResolversTypes['RevisionWithoutRelations']>>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DocumentWithoutRelationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['DocumentWithoutRelations'] = ResolversParentTypes['DocumentWithoutRelations']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  document?: Resolver<Maybe<ResolversTypes['DocumentWithRelations']>, ParentType, ContextType, RequireFields<QueryDocumentArgs, 'id'>>;
  revision?: Resolver<Maybe<ResolversTypes['RevisionWithRelations']>, ParentType, ContextType, RequireFields<QueryRevisionArgs, 'id'>>;
  revisions?: Resolver<Array<Maybe<ResolversTypes['RevisionWithRelations']>>, ParentType, ContextType, RequireFields<QueryRevisionsArgs, 'documentId'>>;
  user?: Resolver<Maybe<ResolversTypes['UserWithRelations']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type RevisionWithRelationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['RevisionWithRelations'] = ResolversParentTypes['RevisionWithRelations']> = {
  additions?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  author?: Resolver<Maybe<ResolversTypes['UserWithoutRelations']>, ParentType, ContextType>;
  authorId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  changes?: Resolver<Array<Maybe<ResolversTypes['JSON']>>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deletions?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  document?: Resolver<Maybe<ResolversTypes['DocumentWithoutRelations']>, ParentType, ContextType>;
  documentId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RevisionWithoutRelationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['RevisionWithoutRelations'] = ResolversParentTypes['RevisionWithoutRelations']> = {
  additions?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  authorId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  changes?: Resolver<Array<Maybe<ResolversTypes['JSON']>>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deletions?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  documentId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserToDocumentWithRelationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserToDocumentWithRelations'] = ResolversParentTypes['UserToDocumentWithRelations']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  document?: Resolver<Maybe<ResolversTypes['DocumentWithoutRelations']>, ParentType, ContextType>;
  documentId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['UserWithoutRelations']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserToDocumentWithoutRelationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserToDocumentWithoutRelations'] = ResolversParentTypes['UserToDocumentWithoutRelations']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  documentId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserWithRelationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserWithRelations'] = ResolversParentTypes['UserWithRelations']> = {
  contributions?: Resolver<Array<Maybe<ResolversTypes['UserToDocumentWithoutRelations']>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastActivity?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  picture?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  revisions?: Resolver<Array<Maybe<ResolversTypes['RevisionWithoutRelations']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserWithoutRelationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserWithoutRelations'] = ResolversParentTypes['UserWithoutRelations']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastActivity?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  picture?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  BaseDocument?: BaseDocumentResolvers<ContextType>;
  BaseRevision?: BaseRevisionResolvers<ContextType>;
  BaseUser?: BaseUserResolvers<ContextType>;
  BaseUserToDocument?: BaseUserToDocumentResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  DocumentWithRelations?: DocumentWithRelationsResolvers<ContextType>;
  DocumentWithoutRelations?: DocumentWithoutRelationsResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  RevisionWithRelations?: RevisionWithRelationsResolvers<ContextType>;
  RevisionWithoutRelations?: RevisionWithoutRelationsResolvers<ContextType>;
  UserToDocumentWithRelations?: UserToDocumentWithRelationsResolvers<ContextType>;
  UserToDocumentWithoutRelations?: UserToDocumentWithoutRelationsResolvers<ContextType>;
  UserWithRelations?: UserWithRelationsResolvers<ContextType>;
  UserWithoutRelations?: UserWithoutRelationsResolvers<ContextType>;
};

