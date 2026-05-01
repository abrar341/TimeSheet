import { Card } from "@/components/app-cards/card/Card"
import { CardFooter } from "@/components/app-cards/card/CardFooter"
import { Col } from "@/components/grid/Col"

const COPYRIGHT_LABEL = "© 2024 tentwenty. All rights reserved."

/**
 * Secondary card placed below primary content — copyright strip used on timesheets list + detail.
 */
export function CopyrightFooterCard() {
  return (
    <Col xs={12}>
      <Card>
        <CardFooter>
          <p className="text-xs text-center w-full text-zinc-500">{COPYRIGHT_LABEL}</p>
        </CardFooter>
      </Card>
    </Col>
  )
}
