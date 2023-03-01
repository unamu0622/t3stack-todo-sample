import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const taskRouter = createTRPCRouter({
  getAll: publicProcedure
    .query(({ ctx }) => {
      return ctx.prisma.task.findMany({
        orderBy: [
          {
            isCompleted: "asc",
          },
          {
            updatedAt: "desc",
          },
        ]
      });
    }),
  create: publicProcedure
    .input(z.object({ text: z.string().min(1) }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.task.create({ data: input })
    }),
  toggle: publicProcedure
    .input(z.object({ id: z.string(), isCompleted: z.boolean() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.task.update({
        where: {
          id: input.id
        },
        data: {
          isCompleted: input.isCompleted
        },
      })
    }),
});
