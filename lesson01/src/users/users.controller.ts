import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
    /**
     * GET /users
     * GET /users/:id
     * POST /users
     * PATCH /users/:id
     * DELETE /users/:id
     */

    @Get() // GET /users
    findAll() {
        return []
    }

    // All static routes should be defined before dynamic routes
    @Get('interns') // GET /users/interns
    findAllInterns() {
        return []
    }
    
    @Get(':id') // GET /users/:id
    findOne(@Param('id') id: string) {
        return { id }
    }
}

