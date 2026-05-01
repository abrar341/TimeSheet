"use client";

import { LoginForm } from "@/modules/auth/forms/LoginForm";
import { Row } from "@/components/grid/Row";
import { Col } from "@/components/grid/Col";

export default function LoginPage() {
  return (
    <div className="min-h-[100vh] bg-white">
      <Row gap={0} className="min-h-[100vh]">
        <Col xs={12} lg={7}>
          <div className="flex min-h-[100vh] items-center justify-center px-6 py-10">
            <div className="w-full max-w-2xl">
              <LoginForm />
            </div>
          </div>
        </Col>

        <Col xs={12} lg={5} className="hidden bg-[#1E5CE5] lg:block" />
      </Row>
    </div>
  );
}
