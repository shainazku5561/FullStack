/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { MaterialService } from "../material.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { MaterialCreateInput } from "./MaterialCreateInput";
import { Material } from "./Material";
import { MaterialFindManyArgs } from "./MaterialFindManyArgs";
import { MaterialWhereUniqueInput } from "./MaterialWhereUniqueInput";
import { MaterialUpdateInput } from "./MaterialUpdateInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class MaterialControllerBase {
  constructor(
    protected readonly service: MaterialService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Material })
  @nestAccessControl.UseRoles({
    resource: "Material",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createMaterial(
    @common.Body() data: MaterialCreateInput
  ): Promise<Material> {
    return await this.service.createMaterial({
      data: data,
      select: {
        createdAt: true,
        description: true,
        id: true,
        name: true,
        price: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [Material] })
  @ApiNestedQuery(MaterialFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Material",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async materials(@common.Req() request: Request): Promise<Material[]> {
    const args = plainToClass(MaterialFindManyArgs, request.query);
    return this.service.materials({
      ...args,
      select: {
        createdAt: true,
        description: true,
        id: true,
        name: true,
        price: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: Material })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Material",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async material(
    @common.Param() params: MaterialWhereUniqueInput
  ): Promise<Material | null> {
    const result = await this.service.material({
      where: params,
      select: {
        createdAt: true,
        description: true,
        id: true,
        name: true,
        price: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Patch("/:id")
  @swagger.ApiOkResponse({ type: Material })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Material",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateMaterial(
    @common.Param() params: MaterialWhereUniqueInput,
    @common.Body() data: MaterialUpdateInput
  ): Promise<Material | null> {
    try {
      return await this.service.updateMaterial({
        where: params,
        data: data,
        select: {
          createdAt: true,
          description: true,
          id: true,
          name: true,
          price: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.Delete("/:id")
  @swagger.ApiOkResponse({ type: Material })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Material",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteMaterial(
    @common.Param() params: MaterialWhereUniqueInput
  ): Promise<Material | null> {
    try {
      return await this.service.deleteMaterial({
        where: params,
        select: {
          createdAt: true,
          description: true,
          id: true,
          name: true,
          price: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
